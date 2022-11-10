const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index')

const router = express.Router();

router.get('/', list)
router.get('/:id', get)
router.post('/', insert)
router.patch('/:id', secure('update'), update)
router.post('/follow/:id', secure('follow'), follow)

async function list (req, res, next) {
    controller.list()
    .then((lista) => {
        response.success(req, res, lista, 200);
    })
    .catch(next);    
}

async function get(req, res, next) {
    controller.get(req.params.id)
    .then((user) => {
        response.success(req, res, user, 200, next);
    })
    .catch(next);    
}

async function insert (req, res, next) {
    controller.insert(req.body)
        .then((user) => {
            response.success(req, res, user, 201); 
        })
        .catch(next);    
}

async function update (req, res, next) {
    controller.update(req.body, req.params.id)
        .then((user) => {
            response.success(req, res, user, 201); 
        })
        .catch(next);    
}

async function follow(req, res, next) {
    controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201); 
        })
        .catch(next);
}

module.exports = router;