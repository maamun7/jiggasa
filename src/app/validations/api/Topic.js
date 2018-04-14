import Joi from 'joi';

const createTopiSchema = Joi.object({
    name: Joi.string().min(3).max(30).required()
   // image: Joi.string().min(11).max(11).required(),
});

const joiOpts = {
    convert: true,
    allowUnknown: true
};

export default {
    createTopiSchema, joiOpts
}