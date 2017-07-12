"use strict";

var express = require('express')
    , router = express.Router();

router.use('/cars', require('./../controllers/api/cars'));

module.exports = router