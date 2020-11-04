import bodyParser from 'body-parser';
import express from 'express';
import mustacheExpress from 'mustache-express';
import path from 'path';
import idporten from './auth/idporten';
import tokenx from './auth/tokenx';
import cors from './cors';
import routes from './routes';
import session from './session';

//import morgan from 'morgan';

const server = express();

async function startApp() {
    try {
        server.use(bodyParser.json());
        // morgan('dev');

        session.setup(server);

        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));

        // setup sane defaults for CORS and HTTP headers
        // server.use(helmet());
        server.use(cors);

        const tokenxAuthClient = await tokenx.client();
        const idportenAuthClient = await idporten.client();

        server.engine('html', mustacheExpress());
        server.set('view engine', 'mustache');
        server.set('views', path.join(__dirname, '../../build'));

        // setup routes
        server.use('/', routes.setup(tokenxAuthClient, idportenAuthClient));

        const port = 3000;
        server.listen(port, () => console.log(`Listening on port ${port}`));
    } catch (error) {
        console.error('Error during start-up', error);
    }
}

startApp().catch((err) => console.log(err));
