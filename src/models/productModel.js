const connection = require('./connection');

const getAll = async () => {
    const db = await connection();

    const result = await db.collection('Products').find().toArray();

    return result;
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
