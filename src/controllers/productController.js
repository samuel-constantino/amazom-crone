const rescue = require('express-rescue');

const { productService } = require('../services');

const create = rescue(async (req, res, next) => {
    const { name, description, categoryId, price } = req.body;

    const result = await productService.create({ name, description, categoryId, price });

    // verifica se houve erro na criação do produto
    if(result != '') return next({ code: result.code, message: result.message });

    return res.status(201).json({message: 'Produto cadastrado com sucesso!'}); 
});

module.exports = {
    create,
    // getAll,
    // getByCategory
};