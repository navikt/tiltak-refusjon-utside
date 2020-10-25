import { TokenSet } from "openid-client";
import config from '../config';

const tokenSetSelfId = "self";

const getOnBehalfOfAccessToken = (tokenxClient, req) => {
    return new Promise(((resolve, reject) => {
        if (hasValidAccessToken(req, config.api.audience)) {
            const tokenSets = getTokenSetsFromSession(req);
            resolve(tokenSets[config.api.audience].access_token);
        } else {
            const now = Math.floor(Date.now() / 1000)
            // additional claims not set by openid-client
            const additionalClaims = {
                clientAssertionPayload: {
                    'nbf': now
                }
            }
            tokenxClient.grant({
                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                audience: config.api.audience,
                subject_token: req.session.tokens.id_token
            }, additionalClaims).then(tokenSet => {
                req.user.tokenSets[config.api.clientId] = tokenSet;
                resolve(tokenSet.access_token);
            }).catch(err => {
                console.error(err);
                reject(err);
            })
        }
    }));
};

const getTokenSetsFromSession = (req) => {
    if (req && req.user) {
        return req.user.tokenSets;
    }
    return null;
};

const hasValidAccessToken = (req, key = tokenSetSelfId) => {
    const tokenSets = getTokenSetsFromSession(req);
    if (!tokenSets) {
        return false;
    }
    const tokenSet = tokenSets[key];
    if (!tokenSet) {
        return false;
    }
    return new TokenSet(tokenSet).expired() === false;
};

export default {
    getOnBehalfOfAccessToken,
    hasValidAccessToken,
    tokenSetSelfId,
};
