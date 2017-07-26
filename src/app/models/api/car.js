"use strict";

const mongoose = require('mongoose');
mongoose.Promise = Promise;
import validator from 'node-mongoose-validator';

const carSchema = mongoose.Schema({
    car_name: {
        type: String,
        required: true,
        validate: validator.$notEmpty({msg: 'Please provide a name.'})
    },

    email: {
        type: String,
        required: true,
        validate: validator.$notEmpty({msg: 'Please provide a eammill.'})
    },

    car_brand: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
       // required: true
    }
});

/*carSchema.path('car_name').validate(validator.$notEmpty({msg: 'Please provide a name.'}));
//carSchema.path('car_name').validate(validator.notEmpty(), 'Please provide a car name.');
carSchema.path('car_brand').validate(validator.notEmpty(), 'Please provide a car brand.');
carSchema.path('email').validate(validator.$notEmpty({msg: 'Please provide a email.'}));
carSchema.path('email').validate(validator.$isEmail({msg: 'Please provide a valid email address'}));
carSchema.path('created_at').validate(validator.notEmpty(), 'The created_at field is required');*/

/*module.exports = carSchema;
module.exports.carModel = mongoose.model('car', carSchema);*/
try {
    const Car =  module.exports = mongoose.model('Car', carSchema);
}
catch(e) {
    console.log("Model already exist");
}



