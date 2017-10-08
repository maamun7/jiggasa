"use strict";
import express from 'express';
var router = express.Router();
import car from './../controllers/api/cars';
import User from './../controllers/api/User';

router.use('/cars', car);
router.use('/', User);


//module.exports = router;

export default router;



