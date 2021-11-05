const rescue = require('express-rescue');

const { productService } = require('../services');

const create = rescue(async (req, res) => {
    const { name, description, categoryId, price } = req.body;

    const { err } = await productService.create({ name, description, categoryId, price });

    if(err) return res.status(err.code).json({ message: err.message });

    return res.status(201).json({message: 'Produto cadastrado com sucesso!'}); 
});

module.exports = {
    create,
    // getAll,
    // getByCategory
};