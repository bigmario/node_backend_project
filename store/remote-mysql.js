const remote = require('./remote');
const config = require('../config');

module.exports = new remote(config.mysql.host, config.mysql.port);