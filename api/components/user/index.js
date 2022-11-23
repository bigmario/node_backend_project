const store = require('../../../store/mysql');
const cache = require('../../../store/redis')
const ctrl = require('./controller')

module.exports = ctrl(store, cache);