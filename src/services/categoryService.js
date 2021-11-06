const { categoryModel } = require('../models');
const { categoryValid } = require('../schemas');

const create = async (name) => {
    try{
        const { err } = categoryValid(name);

        if (err) return { code: 400, message: err.message }

        // busca cetegoria pelo nome
        const categoryFound = await categoryModel.getByName(name)

        // verifica se o objeto retornado possui um objeto de erro
        if (categoryFound.code) return { code: categoryFound.code, message: categoryFound.message };

        // verifica se categoria já existe
        if (categoryFound) return { code: 400, message: 'Categoria já existe' }

        const result = await categoryModel.create(name);

        // verifica se result é um objeto de erro
        if(result.code) return { code: result.code, message: result.message };

        if (!result) return { code: 500, message: "Erro ao inserir categoria" }

        return '';
    } catch ({ code, message }) {
        return { code, message };
    }  
};

const getAll = async () => {
    try{
        const categories = await categoryModel.getAll();

        // verifica se categories é um objeto de erro
        if (categories.code) return { code: categories.code, message: categories.message };
    
        return categories;
    } catch ({ code, message }) {
        return { code, message };
    }
};

module.exports = {
    create,
    getAll
}