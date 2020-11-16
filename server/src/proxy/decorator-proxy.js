import proxy from 'express-http-proxy';
import axios from 'axios';

const setup = (router) => {
    router.use('/dekoratoren/api/auth', (req, res) => {
        res.json({ authenticated: true, name: '' });
    });

    router.use('/dekoratoren', proxy('http://www.nav.no'));

    router.use('/dekoratoren/env', async (req, res) => {
        const response = await axios.get('https://www.nav.no/dekoratoren/env?context=arbeidsgiver');
        res.json({ ...response.data, APP_URL: '/dekoratoren', LOGOUT_URL: '/logout' });
    });
};

export default { setup };
