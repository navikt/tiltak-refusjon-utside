import proxy from 'express-http-proxy';
import authUtils from '../auth/utils';
import config from '../config';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            format: format.combine(format.timestamp(), loggerFormat),
            filename: path.join(__dirname, "../", "logs", "combined.log"),
        }),
    ],
});

const setup = (router, tokenxClient) => {
    router.use("/api", proxy(config.api.url, {
        parseReqBody: false,
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        },
        proxyReqOptDecorator: (options, req) => {
            logger.info("proxy");
            return new Promise(((resolve, reject) =>
                    authUtils.getOnBehalfOfAccessToken(
                        req.session.tokens.id_token, tokenxClient
                    ).then(access_token => {
                            options.headers.Authorization = `Bearer ${access_token}`;
                            resolve(options)
                        },
                        error => reject(error))
            ))
        }
    }));
};

export default {setup}
