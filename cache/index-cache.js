const express = require('express');
const bodyParser = require('body-parser');
const redis = require('../store/redis')

const config = require('../config');
const router = require('./network');

const app = express();

app.use(bodyParser.json());

// RUTAS
app.use('/', router)

app.listen(config.cacheService.servicePort, () => {
    console.log('Servicio de caché redis escuchando en el puerto', config.cacheService.servicePort);
})