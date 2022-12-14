const express = require('express');
const response = require('../../../network/response');
const controller = require('./index')

const router = express.Router();

router.get('/', list)

async function list (req, res, next) {
    controller.list()
    .then((lista) => {
        response.success(req, res, lista, 200);
    })
    .catch(next);    
}

module.exports = router;