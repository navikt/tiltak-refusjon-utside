import express from 'express';
import path from 'path';

import proxy from 'http-proxy-middleware';

const router = express.Router();

const ensureAuthenticated = async (req, res, next) => {
    // if (req.isAuthenticated() && authUtils.hasValidAccessToken(req)) {
        next();
    // } else {
    //     res.redirect('/tiltak-refusjon/login');
    // }
};

const setup = () => {
    // Unprotected
    router.get('/isAlive', (req, res) => res.send('Alive'));
    router.get('/isReady', (req, res) => res.send('Ready'));

    router.get('/login', (req, res) => {
        console.log("login")
    });

    router.use(ensureAuthenticated);

    router.get('/logout', (req, res) => {
        // req.logOut();
    });

    router.use("/api", proxy({
        changeOrigin: true,
        target: process.env.API_URL || 'http://localhost:8080',
        pathRewrite: {"^/tiltak-refusjon/api": "/tiltak-refusjon-api"},
        xfwd: true,
    }));

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
