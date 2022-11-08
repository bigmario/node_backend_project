const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index')

const router = express.Router();

router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', secure('update'), upsert)

async function list (req, res) {
    // controller.list()
    // .then((lista) => {
    //     response.success(req, res, lista, 200);
    // })
    // .catch((err) => {
    //     response.error(req, res, err.message, 500);
    // });
    try {
        const lista = await controller.list();
        response.success(req, res, lista, 200);      
    } catch (err) {
        response.error(req, res, err.message, 500);
    }
    
}

async function get(req, res) {
    // controller.get(req.params.id)
    // .then((user) => {
    //     response.success(req, res, user, 200);
    // })
    // .catch((err) => {
    //     response.error(req, res, err.message, 500);

    // });

    try {
        const user = await controller.get(req.params.id);
        response.success(req, res, user, 200);      
    } catch (err) {
        response.error(req, res, err.message, 500);
    }
    
}

async function upsert (req, res) {
    try {
        const user = await controller.upsert(req.body);
        console.log(user);
        response.success(req, res, user, 201);      
    } catch (err) {
        response.error(req, res, err.message, 500);
    }
    
}

module.exports = router;