"use strict";
const mongoose = require('mongoose');
mongoose.Promise = Promise;

try {
    const Search =  module.exports = mongoose.model('Questions');
}
catch(e) {
    console.log("Model already exist");
}