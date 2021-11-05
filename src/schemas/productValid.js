const Joi = require('joi');

const userValid = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        description: Joi.string().min(3).max(50).required(),
        categoryId: Joi.string().alphanum().required(),
        price: Joi.number().positive().min(1).required(),
    });

    const { error } = schema.validate(user);

    if (error) return { err: error }

    return '';
};

module.exports = userValid;