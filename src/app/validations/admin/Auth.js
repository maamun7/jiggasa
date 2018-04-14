import Joi from 'joi';

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required()
});

const joiOpts = {
    convert: true,
    allowUnknown: true
};

export default {
    loginSchema, joiOpts
}