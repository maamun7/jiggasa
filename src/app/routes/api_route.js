"use strict";
import express from 'express';
var router = express.Router();
import User from './../controllers/api/User';
import Question from './../controllers/api/Question';
import passport from 'passport';

// Token verification route
router.get('/authenticate',
    passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.status(200).json({
            success : true,
        });
    });

router.use('/', User);
router.use('/', Question);

//module.exports = router;

export default router;



