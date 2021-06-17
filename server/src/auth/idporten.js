import { custom, Issuer } from 'openid-client';
import config from '../config';
import httpProxy from '../proxy/http-proxy';

const metadata = () => {
    const idportenConfig = config.idporten();

    return {
        client_id: idportenConfig.clientID,
        redirect_uris: [idportenConfig.redirectUri],
        response_types: idportenConfig.responseType,
        token_endpoint_auth_method: idportenConfig.tokenEndpointAuthMethod,
        token_endpoint_auth_signing_alg: idportenConfig.tokenEndpointAuthSigningAlg,
    };
};

let idportenMetadata = null;

const client = async () => {
    const idportenConfig = config.idporten();

    if (httpProxy.agent) {
        custom.setHttpOptionsDefaults({
            agent: httpProxy.agent,
        });
    }
    idportenMetadata = await Issuer.discover(idportenConfig.discoveryUrl);
    console.log(`Discovered issuer ${idportenMetadata.issuer}`);
    const jwk = JSON.parse(idportenConfig.clientJwk);
    return new idportenMetadata.Client(metadata(), { keys: [jwk] });
};

const authUrl = (session, idportenClient) => {
    const idportenConfig = config.idporten();

    return idportenClient.authorizationUrl({
        scope: idportenConfig.scope,
        redirect_uri: idportenConfig.redirectUri,
        response_type: idportenConfig.responseType,
        response_mode: idportenConfig.responseMode,
        nonce: session.nonce,
        state: session.state,
        resource: 'https://nav.no',
    });
};

const validateOidcCallback = async (idportenClient, req) => {
    const idportenConfig = config.idporten();

    const params = idportenClient.callbackParams(req);
    const nonce = req.session.nonce;
    const state = req.session.state;
    return await idportenClient.callback(
        idportenConfig.redirectUri,
        params,
        { nonce, state },
        { clientAssertionPayload: { aud: idportenMetadata.metadata.issuer } }
    );
};

const refresh = async (idportenClient, oldTokenSet) => {
    return await idportenClient.refresh(oldTokenSet);
};

export default { client, authUrl, validateOidcCallback, refresh };
