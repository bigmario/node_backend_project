const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
    url: `redis://${config.cacheService.user}:${config.cacheService.password}@${config.cacheService.host}:${config.cacheService.port}`
});

(async () => {
    await client.connect();
    console.log('Conectado a REDIS');
})();

async function list(table) {
    const value = await client.get(table);
    return JSON.parse(value);
}

async function get(table, id) {
    const value = await client.get(`${table}_${id}`);
    return JSON.parse(value);
}

async function upsert(table, data) {
    let key = table;
    if (data && data.id) {
        key += '_' + data.id;
    }
    await client.set(key, JSON.stringify(data), {EX:10});
    return true;
}

module.exports = {
    client,
    list,
    get,
    upsert,
};