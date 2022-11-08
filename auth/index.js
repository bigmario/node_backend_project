const config = require('../config');
const jwt = require('jsonwebtoken');

function sign(data) {
    return jwt.sign(data, config.jwt.secret);
}

function verify(token) {
    return jwt.verify(token, config.jwt.secret)
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req);
        if (decoded.id !== owner) {
            throw new Error('No puedes hacer esto');
        }
    }
}

function getToken(auth) {
    if (!auth) {
        throw new Error('no  viene token');
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}

module.exports = {
    sign,
    check,
};