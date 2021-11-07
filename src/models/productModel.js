const connection = require('./connection');
const logReport = require('../schemas/logReport');
const { ObjectId } = require('mongodb');

const getAll = async (category) => {
    try{
        const db = await connection();

        let products = [];

        if (!category || category === '') {
            products = await db.collection('Products').find().toArray();

            // imprime log de consulta
            logReport('info', 200, `Consulta : Todos os produtos.`);
        } else {
            const obj = await db.collection('Categories').findOne({name: category});
            
            if (!obj) throw {code: 400, message: 'Categoria inválida.'}

            const categoryId = ObjectId(obj._id).toString();

            products = await db.collection('Products').find({categoryId}).toArray();

            // imprime log de consulta
            logReport('info', 200, `Consulta : Produtos pela categoria ${category}`);
        };
        
        return products;
    } catch ({ code, message }) {
        return { code, message };
    }
};

const getByName = async (name) => {
    const db = await connection();

    const product = await db.collection('Products').findOne({name});

    return product;
};

const create = async (product) => {
    try {
        const db = await connection();

        const { insertedId } = await db.collection('Products').insertOne({...product});

        if (!insertedId) return false;

        // imprime log de cadastro
        logReport('info', 201, `Cadastro: Produto ${insertedId}`);

    return true;
    } catch ({ code, message }) {
        return { code, message };
    }  
};

module.exports = {
    getAll,
    getByName,
    create,
};
