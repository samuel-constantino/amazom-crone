const express = require('express');

const { userController }  = require('../controllers');

const route = express.Router();

route.get('/', userController.getAll);

route.post('/create', userController.create);

route.post('/login', userController.login);

module.exports = route;