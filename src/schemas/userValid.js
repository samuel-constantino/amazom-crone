const Joi = require('joi');

const userValid = (user) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().alphanum().min(3).max(30).required(),
    });

    const { error } = schema.validate(user);

    if (error) return { code: 400, message: error }

    return '';
};

module.exports = userValid;