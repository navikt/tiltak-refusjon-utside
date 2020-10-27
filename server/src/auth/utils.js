import config from '../config';

export const getOnBehalfOfAccessToken = async (idportenToken, tokenxClient) => {
    const now = Math.floor(Date.now() / 1000)
    // additional claims not set by openid-client
    const additionalClaims = {
        clientAssertionPayload: {
            'nbf': now
        }
    }
    return tokenxClient.grant({
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
        audience: config.api.audience,
        subject_token: idportenToken
    }, additionalClaims).then(tokenSet => {
        return Promise.resolve(tokenSet.access_token)
    }).catch(err => {
        console.log(`Error while exchanging token: ${err}`)
        return Promise.reject(err)
    })
}

export default {
    getOnBehalfOfAccessToken
};
