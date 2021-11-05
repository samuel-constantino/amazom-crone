const connection = require('./connection');

const create = async (user) => {
    const db = await connection();

    const result = await db.collection('Users').insertOne({user});

    if (!result.insertedId) {
        return {
            error: "Erro ao inserir usuário",
        }
    }
};

module.exports = {
    create,
};
