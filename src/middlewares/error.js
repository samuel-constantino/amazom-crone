const logReport = require('../schemas/logReport');

module.exports = (err, _req, res, _next) => {
  
    // Mapa que conecta um erro de domínio a um status HTTP.
    const statusByErrorCode = [
      400, // badRequest: Erro de requisição mal feita
      404, // notFound: Página não encontrada
      409, // alreadyExists: Conflito, já existe
    ];
  
    // Buscamos o status adequado para o erro que estamos tratando.
    // Se não houver, o erro é desconhecido e utilizamos o status 500 Internal Server Error
    const status = statusByErrorCode.find(e => e === err.code) || 500;

    // Imprime log de erro
    logReport('error', status, err.message);
    
    // Por último, retornamos o status e a mensagem de erro para o client
    res.status(status).json({ error: { message: err.message } });
  };
