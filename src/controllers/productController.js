const rescue = require('express-rescue');

const { productService } = require('../services');

const getAll = rescue(async (req, res, next) => {
    try {
        const { category } = req.query;

        const result = await productService.getAll(category);

        if (result.code) return next({code: result.code, message: result.message});

    return res.status(200).json(result);
    } catch ({ code, message }) {
        next({ code, message });
    }
});

const create = rescue(async (req, res, next) => {
    const { name, description, categoryId, price } = req.body;

    const result = await productService.create({ name, description, categoryId, price });

    // verifica se houve erro na criação do produto
    if(result != '') return next({ code: result.code, message: result.message });

    return res.status(201).json({message: 'Produto cadastrado com sucesso!'}); 
});

module.exports = {
    getAll,
    create,
};