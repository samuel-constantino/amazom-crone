const { userModel } = require('../models');
const { userValid } = require('../schemas');

const userExists = async (email) => {
    const user = await userModel.getByEmail(email);

    if (!user) return false;

    return true;
};

const create = async (user) => {
    const { err } = userValid(user);

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
    create,
};
