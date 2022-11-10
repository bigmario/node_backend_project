const error = require('../../../utils/error');
const bcrypt = require('bcrypt');
const auth = require('../../../auth')
const TABLA = 'auth';
module.exports = function(injectedStore) {
    let store = injectedStore;

    if(!store) {
        store = require('../../../store/mysql');
    }

    async function login(username, password) {
        const data = await store.query(TABLA, { username: username });
        if (!data) {
            throw error('Usuario no encontrado', 404)
        }

        const equals = await bcrypt.compare(password, data.password);
        if (!equals) {
            throw error('información invalida', 400);
        }

        //generar token
        return auth.sign(data);

    }

    async function upsert(data) {
        const authData = {
            id: data.id,
        };

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 10);
        }

        return store.insert(TABLA, authData);
    }

    return {
        upsert,
        login
    }
}