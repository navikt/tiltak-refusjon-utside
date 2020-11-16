import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';

const setup = (router) => {
    router.use('/dekoratoren/api/auth', (req, res) => {
        res.json({ authenticated: true, name: '' });
    });

    router.use('/dekoratoren/env', async (req, res) => {
        const response = await axios.get(`${process.env.DECORATOR_URL}/env?context=arbeidsgiver`);
        res.json({ ...response.data, APP_URL: '/dekoratoren', LOGOUT_URL: '/logout' });
    });

    router.use('/dekoratoren', createProxyMiddleware({ target: 'http://www.nav.no' }));
};

export default { setup };
