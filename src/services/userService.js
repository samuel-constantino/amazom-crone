const { userModel } = require('../models');
const { userValid, formatUser } = require('../schemas');
const logReport = require('../schemas/logReport');

const getAll = async () => {
    try{
        const users = await userModel.getAll();

        // verifica se users é um objeto de erro
        if (users.code) throw { code: users.code, message: users.message };
    
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
        
        // busca usuário pelo email
        const userFound = await userModel.getByEmail(user.email);

        if (userFound) {
            // verifica se userFound é um objeto de erro
            if (userFound.code) return { code: userFound.code, message: userFound.message }

            return { code: 400, message: 'Usuário já existe' };
        };

        const result = await userModel.create(user);
    
        if (!result) return { code: 500, message: "Erro ao inserir usuário" };

        // verifica se result é um objeto de erro
        if(result.code) return { code: result.code, message: result.message };
    
        return '';
    } catch ({ code, message }) {
        return { code, message };
    }
};

const login = async (data) => {
    try {
        const { email, password } = data;
    
        const result = await userModel.getByEmail(email);

        if (result.code) throw {code: result.code, message: result.message};

        if (!result) throw {code: 400, message: 'Erro de login: email não encontrado'};

        if (result.password !== password) throw {code: 400, message: 'Erro de login: senha inválida'};

        // imprime log de login
        logReport('info', 200, `Login: Usuário ${result._id}`);
    
        return result;
    } catch ({ code, message }) {
        return { code, message };
    }
};

module.exports = {
    getAll,
    create,
    login
};
