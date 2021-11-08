const rescue = require('express-rescue');

const { productService } = require('../services');

const getAll = rescue(async (req, res, next) => {
    const { category } = req.query;

    const result = await productService.getAll(category);

    if (result.code) return next({code: result.code, message: result.message});

    return res.status(200).json(result);
});

const create = rescue(async (req, res, next) => {
    const { name, description, categoryId, price } = req.body;

    const result = await productService.create({ name, description, categoryId, price });
    
    // verifica se houve erro na criação do produto
    if(result != '') return next({ code: result.code, message: result.message });

    // REFATORAÇÂO -> objeto de sucesso será retornado pelo result
    return res.status(201).json({message: 'Produto cadastrado com sucesso!'}); 
});

const sell = rescue(async (req, res, next) => {
    const { productId } = req.query;

    const { userId, price, quantity } = req.body;

    const result = await productService.sell({ productId, userId, price, quantity });

    if (result.code) return next({code: result.code, message: result.message});

    return res.status(200).json(result);
});

module.exports = {
    getAll,
    create,
    sell,
};