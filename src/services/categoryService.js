const { categoryModel } = require('../models');
const categoryValid = require('../schemas');

const create = async (user) => {
    const { err } = categoryValid(user);

    if (err) return {
        error: { code: 400, message: err.message },
    }

    const userFound = await userExists(user.email);

    if (userFound) return {
        error: { code: 400, message: 'Este usuário já existe' },
    }

    const result = await userModel.create(user);

    if (!result) {
        return {
            error: { code: 500, message: "Erro ao inserir usuário" },
        }
    }

    return '';
};

module.exports = {
    create
}