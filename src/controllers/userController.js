const rescue = require('express-rescue');
const logger = require('../logger');

const { userService } = require('../services');

const getAll = rescue(async (_req, res, next) => {
    try {
        const result = await userService.getAll();

        if (result.code) return next({code: result.code, message: result.message});

    return res.status(200).json(result);
    } catch ({ code, message }) {
        next({ code, message });
    }
});

const create = rescue(async (req, res, next) => {
    const { name, email, password } = req.body;

    const result = await userService.create({name, email, password});

    // verifica se houve erro na criação de usuário
    if (result !== '') return next({code: result.code, message: result.message});

    // imprime log de sucesso
    logger.info(`CODE: 201 | MESSAGE: Usuário criando com sucesso!`);

    return res.status(201).json({message: 'Usuário criado com sucesso!'});
});

const login = rescue(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userService.login({ email, password });
    
    if (!user) return next({code: 400, message: 'Email ou senha inválida'});

    return res.status(200).json({message: `Bem Vindo(a) ${user.name}`});
});

const buy = rescue(async (req, res) => {
    res.status(200).json({message: 'userController buy OK'});
});

module.exports = {
    getAll,
    create,
    login,
    buy
};