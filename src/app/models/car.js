"use strict";

const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    car_name: {
        type: String,
        required: true
    },

    car_brand: {
        type: String,
        required: true
    }
});

module.exports = carSchema;

