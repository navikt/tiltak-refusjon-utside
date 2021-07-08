const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

const serverPort = process.env.SERVER_PORT || '8081';

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({ target: 'http://localhost:' + serverPort, changeOrigin: true }));

    app.use('/dekoratoren/env', async (req, res) => {
        const response = await axios.get(
            'https://www.nav.no/dekoratoren/env?context=arbeidsgiver&feedback=false&level=Level4&redirectToApp=true'
        );
        res.json({
            ...response.data,
            API_INNLOGGINGSLINJE_URL: '/dekoratoren/api',
            APP_URL: '/dekoratoren',
            LOGOUT_URL: '/logout',
        });
    });
    app.use('/dekoratoren/api/auth', async (req, res) => {
        try {
            const response = await axios.get('http://localhost:' + serverPort + '/api/arbeidsgiver/innlogget-bruker', {
                headers: req.headers,
            });
            res.json({ authenticated: true, name: response.data.identifikator || '' });
        } catch (error) {
            res.json({ authenticated: false });
        }
    });
    app.use('/logout', (req, res) => {
        res.clearCookie('tokenx-token');
        res.clearCookie('aad-token');
        res.redirect('/');
    });

    app.use('/dekoratoren', createProxyMiddleware({ target: 'https://www.nav.no', changeOrigin: true }));
};
