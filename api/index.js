const express = require('express');

const config = require('../config');
const user = require('./components/user/network');

const app = express();

// ROUER
app.use('/api/user', user);

app.listen(config.api.port, () => {
    console.log(`Api escuchando en: http://${config.api.host}:${config.api.port}`);
});