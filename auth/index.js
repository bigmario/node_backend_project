const config = require('../config');
const jwt = require('jsonwebtoken');
const error = require('../utils/error')

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
            throw error('No puedes hacer esto', 401);
        }
    },
    logged: (req, owner) => {
        const decoded = decodeHeader(req);
    }
}

function getToken(auth) {
    if (!auth) {
        throw error('no  viene token', 400);
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato invalido', 400);
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