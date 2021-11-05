const express = require('express');

const { productRouter }  = require('../controllers');

const route = express.Router();

route.post('/create', productRouter.create);

route.get('/', productRouter.getAll);

route.get('/:id', productRouter.getByCategory);

module.exports = route;