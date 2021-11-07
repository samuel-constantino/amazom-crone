const connection = require('./connection');
const logReport = require('../schemas/logReport');

const getAll = async () => {
    try{
        const db = await connection();
    
        const users = await db.collection('Users').find().toArray();

        // imprime log de consulta
        logReport('info', 200, `Consulta : Todos usuários.`);

        return users;
    } catch ({ code, message }) {
        return { code, message };
    }
};

const getByEmail = async (email) => {
    try{
        const db = await connection();
    
        const user = await db.collection('Users').findOne({email});

        // imprime log de consulta por email
        if (user) logReport('info', 200, `Consulta: Usuário ${user._id}`);
    
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
        logReport('info', 201, `Cadastro: Usuário ${insertedId}`);

        return true;
    } catch ({ code, message }) {
        return { code, message };
    }  
};

module.exports = {
    getAll,
    getByEmail,
    create,
};
