import proxy from 'express-http-proxy';

const setup = (router) => {
    router.use("/api", proxy(process.env.API_URL, {
        parseReqBody: false,
        proxyReqOptDecorator: (options, req) => {
            const access_token = req.cookies["selvbetjening-idtoken"];
            if (access_token) {
                options.headers.Authorization = `Bearer ${access_token}`;
            }
        },
        proxyReqPathResolver: req => {
            return req.originalUrl.replace("/api", "/tiltak-refusjon-api");
        }
    }));
};

export default {setup}
