import Joi from 'joi';

const questionSchema = Joi.object({
    title: Joi.string().min(3).max(3000).required(),
    topicId: Joi.string().required(), 
    createdBy: Joi.string().required()
});

const joiOpts = {
    convert: true,
    allowUnknown: true
};

export default {
    questionSchema, joiOpts
}