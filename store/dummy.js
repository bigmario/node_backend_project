const db = {
    'user': [
        { id: 1, name: 'Mario' },
        { id: 2, name: 'Andres' }
    ]
}

async function list(table) {
    return await db[table];
}

async function get(table, id) {
    return await db[table].filter((item) => item.id === parseInt(id))[0] || null;
}

function upsert(table, data) {
    db[table].push(data);
}

function remove(table, id) {
    return true;
}

module.exports = { list, get, upsert, remove }