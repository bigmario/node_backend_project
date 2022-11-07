const db = {
    user: [
        { id: '1', username: 'mario', id: 1 },
        { id: '2', username: 'andres', id: 2 }
    ],
    auth: [
        {
          id: '1',
          username: 'mario',
          password: '12345'
        },
        {
          id: '2',
          username: 'andres',
          password: '12345'
        }
      ]
}

async function list(table) {
    return await db[table] || [];
}

async function get(table, id) {
    let col = await list(table);
    return col.filter((item) => item.id === id)[0] || null;
}

async function upsert(table, data) {
    if (!db[table]) {
        db[table] = [];
    }
    await db[table].push(data);

    console.log(db);
}

async function remove(table, id) {
    return true;
}

async function query(table, q) {
    let col = await list(table);
    let keys = Object.keys(q);
    let key = keys[0];
    return col.filter((item) => item.key === q.key)[0] || null;
}

module.exports = { list, get, upsert, remove, query }