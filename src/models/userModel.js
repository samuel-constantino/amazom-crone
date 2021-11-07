const connection = require('./connection');
const logReport = require('../schemas/logReport');
const { ObjectId } = require('mongodb');

const getAll = async () => {
    try{
        const db = await connection();
    
        const users = await db.collection('Users').find().toArray();

        // imprime log de consulta
        logReport('info', 201, `Todos usuários consultados`);

        return users;
    } catch ({ code, message }) {
        return { code, message };
    }
};

const login = async (email) => {
    try{
        const db = await connection();
    
        const user = await db.collection('Users').findOne({email});

        if (!user) throw {code: 400, message: 'Erro de login: email não encontrado'};

        // imprime log de consulta por email
        logReport('info', 201, `Consulta: Usuário ${user._id}`);
    
        return user;
    } catch ({ code, message }) {
        return { code, message };
    }
};

const create = async (user) => {
    try{
        const db = await connection();

        const { insertedId } = await db.collection('Users').insertOne({...user});
    
        if (!insertedId) return false;

        // imprime log de cadastro
        logReport('info', 201, `Usuário ${insertedId} cadastrado`);

        return true;
    } catch ({ code, message }) {
        return { code, message };
    }  
};

module.exports = {
    getAll,
    login,
    create,
};
