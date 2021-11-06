const rescue = require('express-rescue');

const { categoryService } = require('../services');

const create = rescue(async (req, res, next) => {
    const { name } = req.body;

    const result = await categoryService.create(name);

    if(result.code) return next({code: result.code, message: result.message});

    return res.status(201).json({message: 'Categoria cadastrada com sucesso!'});
});

const getAll = rescue(async (_req, res, next) => {

    const result = await categoryService.getAll();

    if (result.code) return next({code: result.code, message: result.message});

    return res.status(200).json(result);
});

module.exports = {
    create,
    getAll,
};