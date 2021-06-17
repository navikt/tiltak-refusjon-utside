import express from 'express';
import { generators } from 'openid-client';
import path from 'path';
import idporten from './auth/idporten';
import config from './config';
import apiProxy from './proxy/api-proxy';
import decoratorProxy from './proxy/decorator-proxy';
import { frontendTokenSetFromSession } from './auth/utils';
import logger from './logger';

const router = express.Router();

const setup = (tokenxClient, idportenClient) => {
    // Unprotected
    router.get('/isAlive', (req, res) => res.send('Alive'));
    router.get('/isReady', (req, res) => res.send('Ready'));

    router.get('/login', async (req, res) => {
        // lgtm [js/missing-rate-limiting]
        const session = req.session;
        session.nonce = generators.nonce();
        session.state = generators.state();
        res.redirect(idporten.authUrl(session, idportenClient));
    });

    router.get('/oauth2/callback', async (req, res) => {
        const session = req.session;

        try {
            const tokenSet = await idporten.validateOidcCallback(idportenClient, req);
            session.frontendTokenSet = tokenSet;
            session.state = null;
            session.nonce = null;
            if (session.redirectTo) {
                res.redirect(session.redirectTo);
            } else {
                res.redirect('/');
            }
        } catch (error) {
            logger.error(error);
            session.destroy();
            res.sendStatus(403);
        }
    });

    const ensureAuthenticated = async (req, res, next) => {
        const frontendTokenSet = frontendTokenSetFromSession(req);
        if (!frontendTokenSet) {
            res.redirect('/login');
        } else if (frontendTokenSet.expired()) {
            req.session.frontendTokenSet = await idporten.refresh(idportenClient, frontendTokenSet);
            next();
        } else {
            next();
        }
    };

    router.use(ensureAuthenticated);

    // Protected
    router.get('/session', (req, res) => {
        res.json(req.session);
    });

    router.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect(idportenClient.endSessionUrl({ post_logout_redirect_uri: config.idporten().logoutRedirectUri }));
    });

    apiProxy.setup(router, tokenxClient);
    decoratorProxy.setup(router);

    router.use(express.static(path.join(__dirname, '../build')));

    return router;
};

export default { setup };
