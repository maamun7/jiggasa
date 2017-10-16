"use strict";
import express from 'express';
var router = express.Router();
import car from './../controllers/api/cars';
import User from './../controllers/api/User';
import passport from 'passport';

// Token verification route
router.get('/authenticate',
    passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.status(200).json({
            success : true,
        });
    });

router.use('/cars', car);
router.use('/', User);


//module.exports = router;

export default router;



