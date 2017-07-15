"use strict";
import express from 'express';
var router = express.Router();
import car from './../controllers/api/cars';

router.use('/cars', car);

module.exports = router