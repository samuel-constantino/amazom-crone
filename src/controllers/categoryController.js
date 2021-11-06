const rescue = require('express-rescue');

const { categoryService } = require('../services');

const getAll = rescue(async (_req, res, next) => {
    try {
        const result = await categoryService.getAll();
    
        if (result.code) return next({code: result.code, message: result.message});
    
        return res.status(200).json(result);
    } catch ({ code, message }) {
        next({ code, message });
    }
});

const create = rescue(async (req, res, next) => {
    const { name } = req.body;

    const result = await categoryService.create(name);

    // verifica se houve erro na criação da categoria
    if(result != '') return next({code: result.code, message: result.message});

    return res.status(201).json({message: 'Categoria cadastrada com sucesso!'});
});

module.exports = {
    getAll,
    create,
};