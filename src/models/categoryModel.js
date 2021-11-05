const connection = require('./connection');

const getAll = async () => {
    const db = await connection();

    const result = await db.collection('Category').find().toArray();

    return result;
};

const getByName = async (name) => {
    const db = await connection();

    const category = await db.collection('Category').findOne({name});

    return category;
};

const create = async (name) => {
    const db = await connection();

    const { insertedId } = await db.collection('Category').insertOne({name});

    if (!insertedId) return false;

    return true;
};

module.exports = {
    create,
    getByName,
    getAll,
};
