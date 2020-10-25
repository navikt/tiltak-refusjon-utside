import {custom, Issuer, Strategy} from 'openid-client';
import authUtils from './utils';
import config from '../config';
import httpProxy from '../proxy/http-proxy';

const metadata = {
    client_id: config.tokenx.clientId,
    token_endpoint_auth_method: config.tokenx.tokenEndpointAuthMethod,
};

const client = async () => {
    if (httpProxy.agent) {
        custom.setHttpOptionsDefaults({
            agent: httpProxy.agent
        });
    }
    const issuer = await Issuer.discover(config.tokenx.discoveryUrl);
    console.log(`Discovered issuer ${issuer.issuer}`);
    const jwk = JSON.parse(config.tokenx.privateJwk);
    return new issuer.Client(metadata, {keys: [jwk]});
};

export default { client };
