const jwt = require('jsonwebtoken');

function sign(data) {
    return jwt.sign(data, 'superSecret');
}

module.exports = {
    sign
};