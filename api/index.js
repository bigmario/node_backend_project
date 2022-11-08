const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const config = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const error = require('../network/errors')


const app = express();
app.use(bodyParser.json())

const swaggerDoc = require('./swagger.json')

// ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(error);

app.listen(config.api.port, () => {
    console.log(`Api escuchando en: http://${config.api.host}:${config.api.port}`);
});