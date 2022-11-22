const axios = require("axios");

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

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


  function list(table) {
    return handleRequest("GET", table);
  }

  return {
    list
  };
}

module.exports = createRemoteDB;