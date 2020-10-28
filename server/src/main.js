import express from 'express';
import mustacheExpress from 'mustache-express';
import path from "path";
import idporten from './auth/idporten';
import tokenx from './auth/tokenx';
import cors from './cors';
import routes from './routes';
import session from './session';
import bodyParser from 'body-parser';
import winston from 'winston';
import fs from 'fs';

// for debugging during development
import morganBody from 'morgan-body';
//import morgan from 'morgan';

const log = fs.createWriteStream(
    path.join(__dirname, "./", "logs", "express.log"), { flags: "a" }
  );

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            format: winston.format.json(), //format.combine(format.timestamp(), loggerFormat),
            filename: path.join(__dirname, "./", "logs", "combined.log"),
        }),
    ],
});
const loggerStream = {
    write: message => {
      logger.info(message);
    },
  };


const server = express();



async function startApp()  {
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

        server.engine("html", mustacheExpress());
        server.set("view engine", "mustache");
        server.set("views", path.join(__dirname, "../../frontend/build"));

        // setup routes
        server.use('/', routes.setup(tokenxAuthClient, idportenAuthClient));

        morganBody(server, {
            stream: log
          });

        const port = 3000;
        server.listen(port, () => console.log(`Listening on port ${port}`));
    } catch (error) {
        console.error('Error during start-up', error);
    }
}

startApp().catch(err => console.log(err));
