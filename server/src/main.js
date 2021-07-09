import bodyParser from 'body-parser';
import express from 'express';
import idporten from './auth/idporten';
import tokenx from './auth/tokenx';
import cors from './cors';
import { startLabs } from './labs';
import logger from './logger';
import routes from './routes';
import session from './session';
import path from 'path';

async function startNormal(server) {
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
        server.use(['/refusjon/*', '/refusjon'], routes.setup(tokenxAuthClient, idportenAuthClient));

        server.get('/isAlive', (req, res) => res.sendStatus(200));
        server.get('/isReady', (req, res) => res.sendStatus(200));

        server.use(express.static(path.join(__dirname, '../build')));

        server.get('/*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
        });

        const port = 3000;
        server.listen(port, () => logger.info(`Listening on port ${port}`));
    } catch (error) {
        logger.error('Error during start-up', error);
    }
}

if (process.env.NAIS_CLUSTER_NAME === 'labs-gcp') {
    startLabs(express()).catch((err) => logger.info(err));
} else {
    startNormal(express()).catch((err) => logger.info(err));
}
