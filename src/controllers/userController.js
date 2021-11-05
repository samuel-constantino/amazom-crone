const rescue = require('express-rescue');

const { userService } = require('../services');

const create = rescue(async (req, res) => {
    const { name, email, password } = req.body;

    const { error } = await userService.create({name, email, password});

    if (error) return res.status(error.code).json({message: error.message});

    return res.status(201).json({message: 'Usuário criado com sucesso'});
});

const login = rescue(async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.login({ email, password });

    if (!user) return res.status(400).json({message: 'Email ou senha inválida'});

    return res.status(200).json({message: `Bem Vindo(a) ${user.name}`});
});

const buy = rescue(async (req, res) => {
    res.status(200).json({message: 'userController buy OK'});
});

module.exports = {
    create,
    login,
    buy
};