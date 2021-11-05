const rescue = require('express-rescue');

const { productService } = require('../services');

const create = rescue(async (req, res) => {
});

module.exports = {
    create,
    getAll,
    getByCategory
};