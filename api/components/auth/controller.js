const bcrypt = require('bcrypt');
const auth = require('../../../auth/index')
const TABLA = 'auth';
module.exports = function(injectedStore) {
    let store = injectedStore;

    if(!store) {
        store = require('../../../store/dummy');
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

        return store.upsert(TABLA, authData);
    }
    
    async function login(username, password) {
        const data = await store.query(TABLA, { username: username });
        const equals = await bcrypt.compare(password, data.password);
        if (equals) {
            //generar token
            return auth.sign(data);
        } else {
            throw new Error('inormacion invalida');
        }
    }

    return {
        upsert,
        login
    }
}