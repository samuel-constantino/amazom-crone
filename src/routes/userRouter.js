const express = require('express');

const { userController }  = require('../controllers');

const route = express.Router();

route.get('/', userController.getAll);

route.post('/create', userController.create);

route.post('/login', userController.login);

route.post('/:id', userController.buy);

module.exports = route;