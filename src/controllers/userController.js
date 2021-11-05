const rescue = require('express-rescue');

const { userService } = require('../services');

const create = rescue(async (req, res) => {
    const { name, email, password } = req.body;

    const { error } = await userService.create({name, email, password});

    if (error) return res.status(error.code).json({message: error.message});

    return res.status(201).json({message: 'Usuário criado com sucesso'});
});

const login = rescue(async (req, res) => {
    res.status(200).json({message: 'userController login OK'});
});

const buy = rescue(async (req, res) => {
    res.status(200).json({message: 'userController buy OK'});
});

module.exports = {
    create,
    login,
    buy
};