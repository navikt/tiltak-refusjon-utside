import express from 'express'
import bodyParser from 'body-parser'
import {generators, TokenSet} from 'openid-client'
import logger from 'logstash'
import * as auth from './auth.js'
import * as config from './config.js'
import * as headers from './headers.js'
import {limit} from './ratelimit.js'
import {setupSession} from './session.js'
import path from "path";
import axios from 'axios';
import reverseProxy from "./reverse-proxy";

const app = express()

let authEndpoint = null
auth.setup(config.idporten, config.tokenx, config.app).then((endpoint) => {
    authEndpoint = endpoint
}).catch((err) => {
    logger.error(`Error while setting up auth: ${err}`)
    process.exit(1)
})

app.use(bodyParser.text())
headers.setup(app)

app.use(limit);

app.set('trust proxy', 1);
app.use(setupSession())

app.get(['/isAlive', '/isReady'], async (req, res) => {
    res.sendStatus(200)
});

app.get("/login", async (req, res) => {
    const session = req.session
    session.nonce = generators.nonce()
    session.state = generators.state()
    res.redirect(auth.authUrl(session))
})

app.get("/oauth2/callback", async (req, res) => {
    const session = req.session
    auth.validateOidcCallback(req)
        .then((tokens) => {
            session.tokens = tokens
            session.state = null
            session.nonce = null
            res.cookie('dings-id', `${tokens.id_token}`, {
                secure: config.app.useSecureCookies,
                sameSite: "lax",
                maxAge: config.session.maxAgeMs
            })
            res.redirect(303, '/')
        })
        .catch((err) => {
            logger.error(err)
            session.destroy(() => {
            })
            res.sendStatus(403)
        })
})

// check auth
app.use(async (req, res, next) => {
    let currentTokens = req.session.tokens
    if (!currentTokens) {
        res.redirect('/login')
    } else {
        let tokenSet = new TokenSet(currentTokens)
        if (tokenSet.expired()) {
            logger.debug('refreshing token')
            tokenSet = new TokenSet(await auth.refresh(currentTokens))
            req.session.tokens = tokenSet
        }
        return next()
    }
})

// serve static files
app.use(express.static(path.join(__dirname, "../frontend/build"), {index: false}));

reverseProxy.setup(app);

app.use('*', async (req, res) => {
    const response = await axios.get(process.env.DECORATOR_URL);
    const body = response.data;

    const {document} = new JSDOM(body).window;
    res.render('index.html', {
        NAV_SCRIPTS: document.getElementById('scripts').innerHTML,
        NAV_STYLES: document.getElementById('styles').innerHTML,
        NAV_SKIPLINKS: document.getElementById('skiplinks').innerHTML,
        NAV_HEADING: document.getElementById('header-withmenu').innerHTML,
        NAV_FOOTER: document.getElementById('footer-withmenu').innerHTML,
        NAV_MENU_RESOURCES: document.getElementById('megamenu-resources').innerHTML,
    });
});

app.listen(config.app.port, () => {
    logger.info(`frontend-dings listening at port ${config.app.port}`)
})
