const express = require('express');
const response = require('../../../network/response');
const store = require('../store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.patch('/:table', update);

async function list(req, res, next) {
    try {
        const datos = await store.list(req.params.table)
        response.success(req, res, datos, 200);
    } catch (error) {
        next(error);
    }
}

async function get(req, res, next) {
    try {
        const datos = await store.get(req.params.table, req.params.id)
        response.success(req, res, datos, 200);        
    } catch (error) {
        next(error);        
    }
}

async function insert(req, res, next) {
    try {
        const datos = await store.insert(req.params.table, req.body)
        response.success(req, res, datos, 200);        
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const datos = await store.update(req.params.table, req.body)
        response.success(req, res, datos, 200);        
    } catch (error) {
        next(error)
    }
}

module.exports = router;