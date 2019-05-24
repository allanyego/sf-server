var OktaJwtVerifier = require('@okta/jwt-verifier'),

    config = require('../../../config/index').okta,

    oktaJwtVerifier = new OktaJwtVerifier({
        issuer: okta.issuer,
        clientId: okta.clientId,
        assertClaims: {
            aud: 'api://default'
        }
    });

module.exports = function(req, res, next) {
    var authHeader = req.headers.authenticate || '',
        match = authHeader.match(/Bearer (.+)/);

    if (!match) {
        return res.status(401).end();
    }

    var accessToken = match[1];
    
    return oktaJwtVerifier.verifyAccessToken(accessToken).
        then(function(jwt) {
            req.jwt = jwt;
            next();
        }).
        catch(function(err) {
            res.status(401).json({
                status: 'fail',
                result: err.message
            });
        });
};