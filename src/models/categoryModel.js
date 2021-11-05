const connection = require('./connection');

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
};
