const { categoryModel } = require('../models');
const { categoryValid } = require('../schemas');

const categoryExists = async (name) => {
    const category = await categoryModel.getByName(name);

    if (!category) return false;

    return true;
};

const create = async (name) => {
    const { err } = categoryValid(name);

    if (err) return {
        error: { code: 400, message: err.message },
    }

    const categoryFound = await categoryExists(name);

    if (categoryFound) return {
        err: { code: 400, message: 'Categoria já existe' },
    }

    const result = await categoryModel.create(name);

    if (!result) return {
        error: { code: 500, message: "Erro ao inserir categoria" },
    }

    return '';
};

const getAll = async () => {
    const categories = await categoryModel.getAll();

    return categories;
};

module.exports = {
    create,
    getAll
}