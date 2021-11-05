const express = require('express');

const { productController }  = require('../controllers');

const route = express.Router();

route.post('/create', productController.create);

route.get('/', productController.getAll);

route.get('/:id', productController.getByCategory);

module.exports = route;