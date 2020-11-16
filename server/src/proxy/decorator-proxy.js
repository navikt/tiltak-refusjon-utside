import proxy from 'express-http-proxy';
import axios from 'axios';

const setup = (router) => {
    router.use('/dekoratoren/api/auth', (req, res) => {
        res.json({ authenticated: true, name: '' });
    });

    router.use('/dekoratoren/env', async (req, res) => {
        const response = await axios.get(`${process.env.DECORATOR_URL}/env?context=arbeidsgiver`);
        res.json({ ...response.data, APP_URL: '/dekoratoren', LOGOUT_URL: '/logout' });
    });

    router.use('/dekoratoren', proxy('http://www.nav.no'));
};

export default { setup };
