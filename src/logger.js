const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.errors({ stack: true }), // indica que os logs incluam stacktrace de erros
        winston.format.json() // indica que o formato dos logs será em json
    ),
    // indica onde os logs serão armazenado, separando-os por level
    /*
    OBS: o level dos logs são incrementais, ou seja: o log de erro possuirá apenas os erros,
    mas o log de info possuirá informações sobre erros outras execuções do app
    */
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
    ],
});

// caso o ambiente de execução não seja 'produção', então gerará logs no terminal também.
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
};

module.exports = logger;