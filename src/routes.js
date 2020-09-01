import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import reverseProxy from "./reverse-proxy";

const router = express.Router();

const ensureAuthenticated = async (req, res, next) => {
    // if (req.headers.cookie.includes("selvbetjening-idtoken")) {
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
        res.redirect(process.env.LOGINSERVICE_URL);
    });

    router.use(ensureAuthenticated);

    router.get('/logout', (req, res) => {
        // req.logOut();
    });

    reverseProxy.setup(router);
    router.use(cookieParser());

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
