const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));

    app.use('/dekoratoren/env', async (req, res) => {
        const response = await axios.get('https://www.nav.no/dekoratoren/env?context=arbeidsgiver&feedback=false');
        res.json({ ...response.data, APP_URL: '/dekoratoren', LOGOUT_URL: '/logout' });
    });
    app.use('/dekoratoren/api/auth', async (req, res) => {
        try {
            const response = await axios.get('http://localhost:8080/api/innlogget-bruker', {
                headers: req.headers,
            });
            res.json({ authenticated: true, name: response.data.identifikator });
        } catch (error) {
            res.json({ authenticated: false });
        }
    });
    app.use('/logout', (req, res) => {
        res.clearCookie('tokenx-token');
        res.redirect('/');
    });

    app.use('/dekoratoren', createProxyMiddleware({ target: 'https://www.nav.no', changeOrigin: true }));
};
