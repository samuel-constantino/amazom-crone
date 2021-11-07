const connection = require('./connection');
const logReport = require('../schemas/logReport');

const getAll = async () => {
    try{
        const db = await connection();
    
        const categories = await db.collection('Categories').find().toArray();

        // imprime log de consulta
        logReport('info', 200, `Consulta: Todas categorias.`);
    
        return categories;
    } catch ({ code, message }) {
        return { code, message };
    }
};

const getByName = async (name) => {
    try{
        const db = await connection();
    
        const category = await db.collection('Categories').findOne({name});
    
        return category;
    } catch ({ code, message }) {
        return { code, message };
    }
};

const create = async (name) => {
    try{
        const db = await connection();
    
        const { insertedId } = await db.collection('Categories').insertOne({name});
    
        if (!insertedId) return false;

        // imprime log de cadastro
        logReport('info', 201, `Cadastro: Categoria ${insertedId}`);
    
        return true;
    } catch ({ code, message }) {
        return { code, message };
    }
};

module.exports = {
    create,
    getByName,
    getAll,
};
