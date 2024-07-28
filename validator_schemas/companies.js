const Joi = require('joi');
const companyValidator = Joi.object({
    name: Joi.string().required().min(5).max(50).messages({
        'string.empty': `Name is a required field`,
        'any.required': `Name is a required field`,
        'string.min': `Name must be at least 5 characters long`,
        'string.max': `Name must be at most 50 characters long`,
    }),
})

module.exports = {
    companyValidator
}