const { userModel } = require('../models');
const { userValid } = require('../schemas');

const create = async (user) => {
    const { err } = userValid(user);

    if (err) {
        return {
            error: { code: 400, message: err.message },
        }
    }

    const message = await userModel.create(user);

    const { error } = message;

    if (error) {
        return {
            error: {code: error.code, message: error.message},
        }
    }

    return {
        sucess: {message: 'Usuário criado com sucesso'},
    }
};

module.exports = {
    create,
};
