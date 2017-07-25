import Joi from 'joi';

const createSchema = Joi.object({
    car_name: Joi.string().required(),
    car_brand: Joi.string().required().valid('Toyota', 'Nissan', 'Mitubishi'),
    make_year: Joi.number().integer().required()
});

const joiOpts = {
    convert: true,
    allowUnknown: true
};

export default {
    createSchema, joiOpts
}