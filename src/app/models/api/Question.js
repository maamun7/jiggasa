"use strict";
const mongoose = require('mongoose');
mongoose.Promise = Promise;
import uniqueValidator from'mongoose-unique-validator';

const createQuestionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String,
        unique: false,
        default: "Dummy.jpg"
    }, 

    status: {
        type: Number,
        default: 1
    },

    created_at: {
        type: Date,
        default: new Date()
    }
});

createQuestionSchema.plugin(uniqueValidator);

try {
    const Question =  module.exports = mongoose.model('Questions', createQuestionSchema);
}
catch(e) {
    console.log("Model already exist");
}