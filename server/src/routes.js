import authUtils from './auth/utils';
import config from './config';
import express from 'express';
import passport from 'passport';
import path from 'path';
import session from 'express-session';
import reverseProxy from "./proxy/reverse-proxy";

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

    router.use('*', (req, res) => {
        res.render('index.html', {
            NAV_SCRIPTS: `<script src="${process.env.DECORATOR_SCRIPT}"></script>`,
            NAV_STYLES: `<link rel="stylesheet" href="${process.env.DECORATOR_STYLING}"/>`,
            NAV_HEADING: "<div id='header'></div><script>NAVSPA.internarbeidsflatefs(document.getElementById('header'), { appname: 'Tiltaksgjennomføring - refusjon', toggles: { visEnhet: false, visEnhetVelger: false, visSokefelt: false, visVeilder: false }})</script>",
            NAV_SKIPLINKS: '',
            NAV_FOOTER: '',
        });
    });

    return router
};

export default { setup };
