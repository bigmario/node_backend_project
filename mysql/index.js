const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const errors = require('../network/errors')


const app = express();
app.use(bodyParser.json())

app.use(errors);

app.listen(config.mysqlService.port, () => {
    console.log(`DB escuchando en puerto ${config.mysqlService.port}`);
});