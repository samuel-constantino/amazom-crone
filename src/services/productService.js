const { ObjectId } = require('mongodb');

const { productModel } = require('../models');
const { productValid } = require('../schemas/');
const logReport = require('../schemas/logReport');
const sendEmail = require('../schemas/sendEmail');

const isValidId = (id) => {
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
};

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

const getSells = async (sellId) => {
    try{
        if (sellId && !isValidId(sellId)) {
            logReport('error', 400, 'Consulta: Id da venda inválida');
            throw { code: 400, message: 'Id da venda inválida' };
        } 

        const result = await productModel.getSells(sellId);

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

const sell = async (order) => {
    try{
        const { userId, productId, price, quantity } = order;
        
        if (!isValidId(userId)) {
            logReport('error', 400, 'Venda: Id do usuário inválido');
            throw { code: 400, message: 'Id do usuário inválido' }
        }

        if (!isValidId(productId)) {
            logReport('error', 400, 'Venda: Id do produto inválido');
            throw { code: 400, message: 'Id do produto inválido' }
        }

        const totalPrice = price * quantity;

        const result = await productModel.sell({
            userId,
            productId,
            totalPrice,
        });

        if (result.code) throw { code: result.code, message: result.message };

        sendEmail();

        return {message: 'Venda concluída com sucesso!'}
    } catch ({ code, message }) {
        return { code, message };
    }
};

module.exports = {
    getAll,
    create,
    sell,
    getSells,
}