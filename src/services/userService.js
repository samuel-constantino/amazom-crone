const { userModel } = require('../models');
const { userValid } = require('../schemas');

const userExists = async (email) => {
    try {
        const user = await userModel.getByEmail(email);
    
        if (!user) return false;
    
        return true;
    } catch (e) {
        next(e)
    }
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

const login = async (data) => {
    const { email, password } = data;

    const result = await userModel.getByEmail(email);

    if (!result) return null;
    if (result.user.password !== password) return null;

    return result.user;
};

module.exports = {
    create,
    login
};
