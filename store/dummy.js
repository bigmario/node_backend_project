const db = {
    'user': [
        { id: 1, name: 'Mario' },
        { id: 2, name: 'Andres' }
    ]
}

function list(table) {
    return db[table];
}

function get(table, id) {
    return db[table].filter((item) => item.id === id)[0] || null;
}

function upsert(table, data) {
    db[table].push(data);
}

function remove(table, id) {
    return true;
}

module.exports = { list, get, upsert, remove }