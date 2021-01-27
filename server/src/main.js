import { startLabs } from './labs';
import express from 'express';

async function startNormal(server) {
    import bodyParser from 'body-parser';
    import * as idporten from './auth/idporten';
    import * as tokenx from './auth/tokenx';
    import cors from './cors';
    import routes from './routes';
    import session from './session';

    try {
        server.use(bodyParser.json());

        session.setup(server);

        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));

        // setup sane defaults for CORS and HTTP headers
        // server.use(helmet());
        server.use(cors);

        const tokenxAuthClient = await tokenx.client();
        const idportenAuthClient = await idporten.client();

        // setup routes
        server.use('/', routes.setup(tokenxAuthClient, idportenAuthClient));

        const port = 3000;
        server.listen(port, () => console.log(`Listening on port ${port}`));
    } catch (error) {
        console.error('Error during start-up', error);
    }
}

if (process.env.NAIS_CLUSTER_NAME === 'labs-gcp') {
    startLabs(express()).catch((err) => console.log(err));
} else {
    startNormal(express()).catch((err) => console.log(err));
}
