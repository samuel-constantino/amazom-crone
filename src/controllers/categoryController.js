const rescue = require('express-rescue');

const { categoryService } = require('../services');

const create = rescue(async (req, res) => {
    const { name } = req.body;

    const { err } = await categoryService.create(name);

    if(err) return res.status(err.code).json({ message: err.message });

    return res.status(201).json({message: 'Categoria cadastrada com sucesso!'});
});

const getAll = rescue(async (_req, res) => {

    const result = await categoryService.getAll();

    return res.status(200).json(result);
});

module.exports = {
    create,
    getAll,
};