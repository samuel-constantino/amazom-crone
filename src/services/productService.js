const { ObjectId } = require('mongodb');

const { productModel } = require('../models');
const { productValid } = require('../schemas');

const getAll = async (category) => {
    try{
        const result = await productModel.getAll(category);

        // verifica se result é um objeto de erro
        if (result.code) throw { code: result.code, message: result.message };
    
        return result;
    } catch ({ code, message }) {
        return { code, message };
    }
};

const create = async (product) => {
    try {
        // verifica se id é válido
        if(!ObjectId.isValid(product.categoryId)) {
            return { code: 400, message: 'Id da categoria inválido'};
        }

        const { code, message } = productValid(product);

        // vefifica se houve erro de validação
        if (code) return { code, message }
    
        // busca produto pelo nome
        const productFound = await productModel.getByName(product.name);
    
        if (productFound) {
            // verifica se productFound é um objeto de erro
            if (productFound.code) return { code: productFound.code, message: productFound.message }


            return { code: 400, message: 'Produto já existe' }
        }
    
        const result = await productModel.create(product);
    
        if (!result) return { code: 500, message: "Erro ao inserir produto" };

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