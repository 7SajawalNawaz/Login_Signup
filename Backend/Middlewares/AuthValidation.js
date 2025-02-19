const Joi = require("joi");

// For SignUp Validation
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(50).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation Error",
            error: error.details[0].message
        });
    }
    next();
}

// For Login Validation
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(50).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation Error",
            error: error.details[0].message
        });
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}
