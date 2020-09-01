import express from 'express';
import path from 'path';
import reverseProxy from "./reverse-proxy";
import axios from 'axios';

const router = express.Router();

const ensureAuthenticated = async (req, res, next) => {
    if (req.cookies['selvbetjening-idtoken']) {
        next();
    } else {
        res.redirect('/login');
    }
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

    // serve static files
    router.use(express.static(path.join(__dirname, "../build"), { index: false }));

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

    return router
};

export default { setup };
