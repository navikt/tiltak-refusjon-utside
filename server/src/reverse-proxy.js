import proxy from 'express-http-proxy';
import * as config from './config';
import {exchangeToken} from './auth';

const setup = (app) => {
    app.use("/api", proxy(config.app.apiUrl, {
        parseReqBody: false,
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        },
        proxyReqOptDecorator: async (options, req) => {
            const accessToken = await exchangeToken(req.session.tokens.id_token);
            options.headers.Authorization = `Bearer ${accessToken}`;
            return options;
        }
    }));
};

export default {setup}
