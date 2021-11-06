module.exports = (err, _req, res, _next) => {
  
    //Passo 1: Identificar o tipo do erro.
  
    // Se for um erro do Joi = erro de validação
    if (err.isJoi) {
      // status 400 Bad Request
      return res.status(400)
        // Mensagem gerada pelo Joi
        .json({ error: { message: err.details[0].message } });
    }
  
    // Caso não seja um erro do Joi, pode ser um erro de domínio ou um erro inesperado.

    // Mapa que conecta um erro de domínio a um status HTTP.
    const statusByErrorCode = [
      400, // badRequest: Erro de requisição mal feita
      404, // notFound: Página não encontrada
      409, // alreadyExists: Conflito, já existe
    ];
  
    // Buscamos o status adequado para o erro que estamos tratando.
    // Se não houver, o erro é desconhecido e utilizamos o status 500 Internal Server Error
    const status = statusByErrorCode.find(e => e === err.code) || 500;
    
    // Por último, retornamos o status e a mensagem de erro para o client
    res.status(status).json({ error: { message: err.message } });
  };
