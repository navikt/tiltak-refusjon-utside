import proxy from 'express-http-proxy';
import config from '../config';
import auth from './auth';

const setup = (app) => {
    app.use("/api", proxy(config.api.url, {
        parseReqBody: false,
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        },
        proxyReqOptDecorator: (options, req) => {
            return new Promise(((resolve, reject) =>
                    auth.exchangeToken(req.session.tokens.id_token).then(access_token => {
                            options.headers.Authorization = `Bearer ${access_token}`;
                            resolve(options)
                        },
                        error => reject(error))
            ))
        }
    }));
};

export default {setup}
