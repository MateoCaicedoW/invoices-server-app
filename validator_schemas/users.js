const Joi = require('joi');
const userValidator = Joi.object({
    first_name: Joi.string().required().messages({
        'string.empty': `First Name is a required field`,
        'any.required': `First Name is a required field`
    }),
    last_name: Joi.string().required().messages({
        'any.required': `Last Name is a required field`,
        'string.empty': `Last Name is a required field`
    }),
    email: Joi.string().email().required().messages({
        'string.empty': `Email is a required field`,
        'string.email': `Email must be a valid email address`,
        'any.required': `Email is a required field`,
    }),
    password: Joi.string().required().min(6).max(8).messages({
        'string.empty': `Password is a required field`,
        'string.min': `Password must be at least 6 characters long`,
        'string.max': `Password must be at most 8 characters long`,
        'any.required': `Password is a required field`
    }),
    password_confirmation: Joi.string().required().messages({
            'string.empty': `Password confirmation is a required field`,
            'any.required': `Password confirmation is a required field`
        }).valid(Joi.ref('password')).messages({
            'any.only': `Passwords do not match`
        })
})

const loginValidator = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': `Email is a required field`,
        'string.email': `Email must be a valid email address`,
        'any.required': `Email is a required field`,
    }),
    password: Joi.string().required().messages({
        'string.empty': `Password is a required field`,
        'any.required': `Password is a required field`,
    })
})

module.exports = {
    userValidator,
    loginValidator
}