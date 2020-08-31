import config from './config';
import routes from './routes';
import cors from './cors';
import express from 'express';
import helmet from 'helmet';
import mustacheExpress from 'mustache-express';
import path from "path";

// for debugging during development
// import morganBody from 'morgan-body';
// import morgan from 'morgan';

const server = express();
const port = config.server.port;

async function startApp()  {
    try {
        // morganBody(server);
        // morgan('dev');

        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));

        // setup sane defaults for CORS and HTTP headers
        // server.use(helmet());
        server.use(cors);

        server.engine("html", mustacheExpress());
        server.set("view engine", "mustache");
        server.set("views", path.join(__dirname, "../build"));

        // setup routes
        server.use(config.contextPath, routes.setup());

        server.listen(port, () => console.log(`Listening on port ${port}`));
    } catch (error) {
        console.error('Error during start-up', error);
    }
}

startApp().catch(err => console.log(err));
