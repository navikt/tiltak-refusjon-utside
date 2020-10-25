import authUtils from './auth/utils';
import config from './config';
import express from 'express';
import passport from 'passport';
import path from 'path';
import session from 'express-session';
import reverseProxy from "./proxy/reverse-proxy";
import axios from 'axios';

const router = express.Router();

const ensureAuthenticated = async (req, res, next) => {
    if (req.isAuthenticated() && authUtils.hasValidAccessToken(req)) {
        next();
    } else {
        session.redirectTo = req.originalUrl;
        res.redirect('/login');
    }
};

const setup = (tokenxClient, idportenClient) => {
    // Unprotected
    router.get('/isAlive', (req, res) => res.send('Alive'));
    router.get('/isReady', (req, res) => res.send('Ready'));

    router.get('/login', passport.authenticate('idportenOidc', { failureRedirect: '/login'}));
    router.use('/oauth2/callback', passport.authenticate('idportenOidc', { failureRedirect: '/login'}), (req, res) => {
        if (session.redirectTo) {
            res.redirect(session.redirectTo);
        } else {
            res.redirect('/');
        }
    });

    router.use(ensureAuthenticated);

    // Protected
    router.get('/session', (req, res) => {
        res.json(req.user);
    });

    router.get('/logout', (req, res) => {
        req.logOut();
        res.redirect(idportenClient.endSessionUrl({ 'post_logout_redirect_uri': config.idporten.logoutRedirectUri }));
    });

    reverseProxy.setup(router, tokenxClient);

    // serve static files
    router.use(express.static(path.join(__dirname, "../build"), { index: false }));

    router.use('*', async (req, res) => {
        const response = await axios.get(process.env.DECORATOR_URL);
        const body = response.data;

        const {document} = new JSDOM(body).window;
        res.render('index.html', {
            NAV_SCRIPTS: document.getElementById('scripts').innerHTML,
            NAV_STYLES: document.getElementById('styles').innerHTML,
            NAV_SKIPLINKS: document.getElementById('skiplinks').innerHTML,
            NAV_HEADING: document.getElementById('header-withmenu').innerHTML,
            NAV_FOOTER: document.getElementById('footer-withmenu').innerHTML,
            NAV_MENU_RESOURCES: document.getElementById('megamenu-resources').innerHTML,
        });
    });

    return router
};

export default { setup };
