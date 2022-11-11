const axios = require('axios');

function createRemoteDB(host, port) {
    const URL = `http://${host}:${port}`;
    body = '';

    function list(table) {
        return handleRequest('GET', table);
    }
    // function get(table, id) {}
    // function insert(table) {}
    // function update(table, id, data) {}
    // function query(table, query, join) {}

    function handleRequest(method, table, data) {
        const config = {
          method,
          url: `${URL}/${table}`,
          data: data || null,
        };
        return new Promise((resolve, reject) => {
          axios(config)
            .then((response) => {
              resolve(response.data.response);
            })
            .catch((error) => {
              reject(error);
            });
        });
      }
    
    return {
        list
    };

}

module.exports=createRemoteDB;