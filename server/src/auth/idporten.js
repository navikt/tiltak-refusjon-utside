import { custom, Issuer } from 'openid-client';
import config from '../config';
import httpProxy from '../proxy/http-proxy';

const metadata = {
    client_id: config.idporten.clientID,
    redirect_uris: [config.idporten.redirectUri],
    response_types: config.idporten.responseType,
    token_endpoint_auth_method: config.idporten.tokenEndpointAuthMethod,
    token_endpoint_auth_signing_alg: config.idporten.tokenEndpointAuthSigningAlg,
};

let idportenMetadata = null;

const client = async () => {
    console.log('**** IDPORTEN CLIENT');
    if (httpProxy.agent) {
        custom.setHttpOptionsDefaults({
            agent: httpProxy.agent,
        });
    }
    idportenMetadata = await Issuer.discover(config.idporten.discoveryUrl);
    console.log(`Discovered issuer ${idportenMetadata.issuer}`);
    const jwk = JSON.parse(config.idporten.clientJwk);
    return new idportenMetadata.Client(metadata, { keys: [jwk] });
};

const authUrl = (session, idportenClient) => {
    console.log('**** 1');
    return idportenClient.authorizationUrl({
        scope: config.idporten.scope,
        redirect_uri: config.idporten.redirectUri,
        response_type: config.idporten.responseType,
        response_mode: config.idporten.responseMode,
        nonce: session.nonce,
        state: session.state,
        resource: 'https://nav.no',
    });
};

const validateOidcCallback = async (idportenClient, req) => {
    const params = idportenClient.callbackParams(req);
    const nonce = req.session.nonce;
    const state = req.session.state;
    console.log('**** 2');
    return await idportenClient.callback(
        config.idporten.redirectUri,
        params,
        { nonce, state },
        { clientAssertionPayload: { aud: idportenMetadata.metadata.issuer } }
    );
};

const refresh = async (idportenClient, oldTokenSet) => {
    console.log('**** 3');
    return await idportenClient.refresh(oldTokenSet);
};

export default { client, authUrl, validateOidcCallback, refresh };
