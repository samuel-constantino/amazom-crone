const { productModel } = require('../models');
const { productValid } = require('../schemas');

const productExists = async (name) => {
    const product = await productModel.getByName(name);

    if (!product) return false;

    return true;
};

const create = async (product) => {
    const result = productValid(product);

    if (result.err) return {
        err: { code: 400, message: err.message },
    }

    const productFound = await productExists(product.name);

    if (productFound) return {
        err: { code: 400, message: 'Produto já existe' },
    }

    const create = await productModel.create(product);

    if (!create) return {
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