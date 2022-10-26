const store = require('../../../store/dummy');
const TABLA = 'user';

function list() {
    return store.list(TABLA)
}

function get(table, id) {
    return store.get(table, id)
}

module.exports = { list, get };