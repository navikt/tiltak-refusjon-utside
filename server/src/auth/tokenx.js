import { custom, Issuer } from 'openid-client';
import config from '../config';
import httpProxy from '../proxy/http-proxy';
import {backendTokenSetFromSession, frontendTokenSetFromSession} from "./utils";
import logger from '../logger';

const metadata = {
    client_id: config.tokenx.clientID,
    token_endpoint_auth_method: config.tokenx.tokenEndpointAuthMethod,
};

export const client = async () => {
    if (httpProxy.agent) {
        custom.setHttpOptionsDefaults({
            agent: httpProxy.agent,
        });
    }
    const issuer = await Issuer.discover(config.tokenx.discoveryUrl);
    console.log(`Discovered issuer ${issuer.issuer}`);
    const jwk = JSON.parse(config.tokenx.privateJwk);
    return new issuer.Client(metadata, { keys: [jwk] });
};

export const getTokenExchangeAccessToken = async (tokenxClient, req) => {
    let backendTokenSet = backendTokenSetFromSession(req);

    if (!backendTokenSet || backendTokenSet.expired()) {
        logger.info("Ny access token")
        const now = Math.floor(Date.now() / 1000);
        const additionalClaims = {
            clientAssertionPayload: {
                nbf: now,
            },
        };
        backendTokenSet = await tokenxClient.grant(
            {
                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                audience: config.api.audience,
                subject_token: frontendTokenSetFromSession(req).access_token,
            },
            additionalClaims
        );
        req.session.backendTokenSet = backendTokenSet;
    } else {
        logger.info("Access token fra session")
    }

    return backendTokenSet.access_token;
};
