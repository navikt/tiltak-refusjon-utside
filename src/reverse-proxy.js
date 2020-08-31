import proxy from 'express-http-proxy';

const setup = (router) => {
    router.use("/api", proxy(process.env.API_URL, {
        parseReqBody: false,
        // proxyReqOptDecorator: (options, req) => {
        //     return new Promise(((resolve, reject) =>
        //             authUtils.getOnBehalfOfAccessToken(
        //                 authClient, req
        //             ).then(access_token => {
        //                     options.headers.Authorization = `Bearer ${access_token}`;
        //                     resolve(options)
        //                 },
        //                 error => reject(error))
        //     ))
        // },
        proxyReqPathResolver: req => {
            return req.originalUrl.replace("/tiltak-refusjon/api", "/tiltak-refusjon-api");
        }
    }));
};

export default {setup}
