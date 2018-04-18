"use strict";
const mongoose = require('mongoose');
mongoose.Promise = Promise;
import uniqueValidator from'mongoose-unique-validator';

const signUpSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },

 /*   mobile: {
        type: String,
        required: true,
        unique: true
    },*/

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    salt: {
        type: String,
        required: true
    },

   /* gender: {
        type: String,
        required: true
    },*/

    is_admin: {
        type: String,
       required: true
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

signUpSchema.plugin(uniqueValidator);

try {
    const User =  module.exports = mongoose.model('Users', signUpSchema);
}
catch(e) {
    console.log("Model already exist");
}



