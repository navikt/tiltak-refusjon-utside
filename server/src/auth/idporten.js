import {custom, Issuer, Strategy} from 'openid-client';
import authUtils from './utils';
import config from '../config';
import httpProxy from '../proxy/http-proxy';

const metadata = {
    client_id: config.idporten.clientId,
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

const strategy = client => {
    const verify = (tokenSet, done) => {
        if (tokenSet.expired()) {
            return done(null, false)
        }
        const user = {
            'tokenSets': {
                [authUtils.tokenSetSelfId]: tokenSet
            },
            'claims': tokenSet.claims()
        };
        return done(null, user);
    };
    const options = {
        client: client,
        params: {
            redirect_uri: config.idporten.redirectUri,
            response_type: config.idporten.responseType,
            response_mode: config.idporten.responseMode,
            scope: config.idporten.scope
        },
        passReqToCallback: false,
        usePKCE: 'S256'
    };
    return new Strategy(options, verify);
};

export default { client, strategy };
