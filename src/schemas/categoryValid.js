const Joi = require('joi');

const categoryValid = (category) => {
    const schema = Joi.string().min(3).max(30).required();

    const { error } = schema.validate(category);

    if (error) return { code: 400, message: error.message }

    return '';
};

module.exports = categoryValid;