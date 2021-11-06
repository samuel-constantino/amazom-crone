const { userModel } = require('../models');
const { userValid, formatUser } = require('../schemas');

const getAll = async () => {
    try{
        const users = await userModel.getAll();

        // verifica se users é um objeto de erro
        if (users.code) return { code: users.code, message: users.message };
    
        return users.map(formatUser);
    } catch ({ code, message }) {
        return { code, message };
    }
};

const create = async (user) => {
    try {
        const { code, message } = userValid(user);
        
        // vefifica se houve erro de validação
        if (code) return { code, message }
        
        // busca usuário por id
        const userFound = await userModel.getByEmail(user.email);

        if (userFound) {
            // verifica se userFound é um objeto de erro
            if (userFound.code) return { code: userFound.code, message: userFound.message }

            return { code: 400, message: 'Este usuário já existe' };
        };

        const result = await userModel.create(user);
    
        if (!result) return { code: 500, message: "Erro ao inserir usuário" }
    
        return '';
    } catch ({ code, message }) {
        return { code, message };
    }
};

const login = async (data) => {
    try {
        const { email, password } = data;
    
        const result = await userModel.getByEmail(email);
    
        if (!result) return null;
        if (result.user.password !== password) return null;
    
        return result.user;
    } catch ({ code, message }) {
        return { code, message };
    }
};

module.exports = {
    getAll,
    create,
    login
};
