import {custom, Issuer} from 'openid-client';
import config from '../config';
import httpProxy from '../proxy/http-proxy';

const metadata = {
    client_id: config.idporten.clientID,
    redirect_uris: [config.idporten.redirectUri],
    response_types: config.idporten.responseType,
    token_endpoint_auth_method: config.idporten.tokenEndpointAuthMethod,
    token_endpoint_auth_signing_alg: config.idporten.tokenEndpointAuthSigningAlg,
};

const client = async () => {
    if (httpProxy.agent) {
        custom.setHttpOptionsDefaults({
            agent: httpProxy.agent
        });
    }
    const issuer = await Issuer.discover(config.idporten.discoveryUrl);
    console.log(`Discovered issuer ${issuer.issuer}`);
    const jwk = JSON.parse(config.idporten.clientJwk);
    return new issuer.Client(metadata, {keys: [jwk]});
};

const authUrl = (session, idportenClient) => {
    return idportenClient.authorizationUrl({
        scope: config.idporten.scope,
        redirect_uri: config.idporten.redirectUri,
        response_type: config.idporten.responseType,
        response_mode: config.idporten.responseMode,
        resource: config.idporten.clientID,
        nonce: session.nonce,
        state: session.state,
    })
}

const validateOidcCallback = async (idportenClient, req) => {
    const params = idportenClient.callbackParams(req)
    const nonce = req.session.nonce
    const state = req.session.state

    return idportenClient
        .callback(config.idporten.redirectUri, params, {nonce, state}, { clientAssertionPayload: { aud: idportenClient.metadata.issuer }})
        .catch((err) => Promise.reject(`error in oidc callback: ${err}`))
        .then(async (tokenSet) => {
            return tokenSet
        })
}

const refresh = (idportenClient, oldTokenSet) =>
    idportenClient.refresh(oldTokenSet).then((newTokenSet) => {
        return Promise.resolve(newTokenSet)
    }).catch(err => {
        console.log(err);
        return Promise.reject(err)
    })

export default { client, authUrl, validateOidcCallback, refresh };
