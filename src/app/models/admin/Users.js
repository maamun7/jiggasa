"use strict";
const mongoose = require('mongoose');
mongoose.Promise = Promise;
import uniqueValidator from'mongoose-unique-validator';

const createUserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    }, 
    
    mobile: {
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

    gender: {
        type: String,
        required: true
    },

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

createUserSchema.plugin(uniqueValidator);

try {
    const AdminUser =  module.exports = mongoose.model('AdminUser', createUserSchema);
}
catch(e) {
    console.log("Model already exist");
}