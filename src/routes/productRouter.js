const express = require('express');

const { productController }  = require('../controllers');

const route = express.Router();

route.get('/', productController.getAll);

route.post('/create', productController.create);

route.get('/sell/', productController.getSells);

route.post('/:id', productController.sell);

module.exports = route;