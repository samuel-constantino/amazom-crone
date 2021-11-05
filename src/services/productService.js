const { productModel } = require('../models');
const { productValid } = require('../schemas');

const productExists = async (name) => {
    const product = await productModel.getByName(name);

    if (!product) return false;

    return true;
};

const create = async (product) => {
    const { err } = productValid(product);

    if (err) return {
        error: { code: 400, message: err },
    }

    const productFound = await productExists(product.name);

    if (productFound) return {
        err: { code: 400, message: 'Produto já existe' },
    }

    const result = await productModel.create(product);

    if (!result) return {
        error: { code: 500, message: "Erro ao inserir produto" },
    }

    return '';
};

const getAll = async () => {
    const result = await productModel.getAll();

    const categories = result.map(formatProduct);

    return categories;
};

module.exports = {
    create,
    getAll
}