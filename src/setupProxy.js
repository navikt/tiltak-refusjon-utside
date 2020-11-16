const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

module.exports = function (app) {
    app.use('/dekoratoren/env', async (req, res) => {
        const response = await axios.get('https://www.nav.no/dekoratoren/env?context=arbeidsgiver');
        res.json({ ...response.data, APP_URL: '/dekoratoren', LOGOUT_URL: '/logout' });
    });
    app.use('/dekoratoren/api/auth', (req, res) => {
        res.json({ authenticated: true, name: '' });
    });
    app.use('/logout', (req, res) => {
        res.clearCookie('tokenx-token');
        res.redirect('/');
    });

    app.use('/dekoratoren', createProxyMiddleware({ target: 'http://www.nav.no', changeOrigin: true }));
};
