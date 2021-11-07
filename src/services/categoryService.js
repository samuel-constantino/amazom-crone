const { categoryModel } = require('../models');
const { categoryValid } = require('../schemas');

const getAll = async () => {
    try{
        const categories = await categoryModel.getAll();

        // verifica se categories é um objeto de erro
        if (categories.code) throw { code: categories.code, message: categories.message };
    
        return categories;
    } catch ({ code, message }) {
        return { code, message };
    }
};

const create = async (name) => {
    try{
        const { code, message } = categoryValid(name);

        // vefifica se houve erro de validação
        if (code) return { code, message };

        // busca cetegoria pelo nome
        const categoryFound = await categoryModel.getByName(name)

        if (categoryFound) {
            // verifica se categoryFound é um objeto de erro
            if (categoryFound.code) return { code: categoryFound.code, message: categoryFound.message };

            return { code: 400, message: 'Categoria já existe' }
        }

        const result = await categoryModel.create(name);

        if (!result) return { code: 500, message: "Erro ao inserir categoria" };

        // verifica se result é um objeto de erro
        if(result.code) return { code: result.code, message: result.message };

        return '';
    } catch ({ code, message }) {
        return { code, message };
    }  
};

module.exports = {
    getAll,
    create,
}