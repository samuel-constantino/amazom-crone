const connection = require('./connection');

const getByName = async (name) => {
    const db = await connection();

    const user = await db.collection('Users').findOne({"user.name": name});
    
    return user;
};

const create = async (user) => {
    const db = await connection();

    const { insertedId } = await db.collection('Users').insertOne({user});

    if (!insertedId) return false;

    return true;
};

module.exports = {
    create,
    getByName,
};
