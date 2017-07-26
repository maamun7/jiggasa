import Joi from 'joi';

const createSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    mobile: Joi.string().min(11).max(11).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    gender: Joi.string().valid('Male', 'Female', 'Others').required(),
    is_admin: Joi.number().integer().default('0')
});

const joiOpts = {
    convert: true,
    allowUnknown: true
};

export default {
    createSchema, joiOpts
}