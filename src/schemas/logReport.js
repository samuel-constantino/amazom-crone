const logger = require('../logger');

const getDate = () => {
    const obj = new Date();

    const date = `${obj.getDate()}/${obj.getMonth()+1}/${obj.getFullYear()}`;
    const hour = `${obj.getHours()}:${obj.getMinutes()}:${obj.getSeconds()}`;
    
    return `${date} ${hour}`;
};

const logReport = (type, code, message) => {
    try {
        console.log(getDate())
        if (type === 'error') {
            return logger
                .error(`[${new Date()}]` `CODE: ${code} | MESSAGE: ${message}`);
        };
    
        if (type === 'info') {
            return logger
                .info(`CODE: ${code} | MESSAGE: ${message} | DATE: ${getDate()}`);
        };

        throw new Error({message: 'Tipo de logger inválido'});
    } catch (e) {
        return logger.error(`ERRO AO RETORNAR LOGGER | MESSAGE: ${e.message}`);
    }
};

module.exports = logReport;