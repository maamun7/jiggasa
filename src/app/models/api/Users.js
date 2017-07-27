"use strict";

const mongoose = require('mongoose');
mongoose.Promise = Promise;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    salt: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    is_admin: {
        type: String,
       required: true
    }
});

try {
    const User =  module.exports = mongoose.model('User', userSchema);
}
catch(e) {
    console.log("Model already exist");
}



