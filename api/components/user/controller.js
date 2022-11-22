const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = function(injectedStore) {
    let store = injectedStore;

    if(!store) {
        store = require('../../../store/remote-mysql');
    }

    function list() {
        return store.list(TABLA)
    }
    
    function get(id) {
        return store.get(TABLA, id)
    }

    async function insert(body) {
        const user = {
            id: nanoid(),
            name: body.name,
            username: body.username,
        }

        await auth.upsert({
            id: user.id,
            username: user.username,
            password: body.password,
        });

        return await store.insert(TABLA, user);
    }

    function follow(from, to) {
        return store.insert(TABLA+'_follow', {
            user_from: from,
            user_to: to,
        });
    }

    function following(user) {
        const join = {};
        join[TABLA] = 'user_to'; // { user: 'user_to }
        const query = { user_from: user };

        return store.query(TABLA + '_follow', query, join);
    }

    return {
        list,
        get,
        insert,
        follow,
        following
    };
};