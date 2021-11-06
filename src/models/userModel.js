const connection = require('./connection');

const getAll = async () => {
    try{
        const db = await connection();
    
        const users = await db.collection('Users').find().toArray();
    
        return users;
    } catch ({ code, message }) {
        return { code, message };
    }
};

const getByEmail = async (email) => {
    try{
        const db = await connection();
    
        const user = await db.collection('Users').findOne({"user.email": email});
    
        return user;
    } catch ({ code, message }) {
        return { code, message };
    }
};

const create = async (user) => {
    try{
        const db = await connection();

        const { insertedId } = await db.collection('Users').insertOne({...user});
        console.log(insertedId)
    
        if (!insertedId) return false;
    
        return true;
    } catch ({ code, message }) {
        return { code, message };
    }  
};

module.exports = {
    getAll,
    create,
    getByEmail,
};
