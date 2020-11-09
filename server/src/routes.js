import axios from 'axios';
import express from 'express';
import { JSDOM } from 'jsdom';
import { generators, TokenSet } from 'openid-client';
import path from 'path';
import * as idporten from './auth/idporten';
import config from './config';
import reverseProxy from './proxy/reverse-proxy';

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
        const tokenSet = await idporten.validateOidcCallback(idportenClient, req);
        session.frontendTokenSet = tokenSet;
        session.state = null;
        session.nonce = null;
        if (session.redirectTo) {
            res.redirect(session.redirectTo);
        } else {
            res.redirect('/');
        }
    });

    const ensureAuthenticated = async (req, res, next) => {
        const { frontendTokenSet } = req.session;
        if (!frontendTokenSet) {
            res.redirect('/login');
        } else if (frontendTokenSet.expired()) {
            req.session.frontendTokenSet = new TokenSet(await idporten.refresh(idportenClient, frontendTokenSet));
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
        req.logOut();
        res.redirect(idportenClient.endSessionUrl({ post_logout_redirect_uri: config.idporten.logoutRedirectUri }));
    });

    reverseProxy.setup(router, tokenxClient);

    // serve static files
    router.use(express.static(path.join(__dirname, '../../build'), { index: false }));

    router.use('*', async (req, res) => {
        const response = await axios.get(process.env.DECORATOR_URL);
        const body = response.data;

        const { document } = new JSDOM(body).window;
        res.render('index.html', {
            NAV_SCRIPTS: document.getElementById('scripts').innerHTML,
            NAV_STYLES: document.getElementById('styles').innerHTML,
            NAV_SKIPLINKS: document.getElementById('skiplinks').innerHTML,
            NAV_HEADING: document.getElementById('header-withmenu').innerHTML,
            NAV_FOOTER: document.getElementById('footer-withmenu').innerHTML,
            NAV_MENU_RESOURCES: document.getElementById('megamenu-resources').innerHTML,
        });
    });

    return router;
};

export default { setup };
