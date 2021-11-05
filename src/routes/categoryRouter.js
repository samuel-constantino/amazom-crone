const express = require('express');

const { categoryController }  = require('../controllers');

const route = express.Router();

route.post('/create', categoryController.create);

route.get('/', categoryController.getAll);

module.exports = route;