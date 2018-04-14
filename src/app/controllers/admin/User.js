var express = require('express')
    , router = express.Router();
const validator = require('express-joi-validation')({ passError: true});
import userModel from '../../models/admin/Users';
import userValidator from '../../validations/admin/User';
import bcrypt from 'bcrypt';
import { makeCustomError, generateToken, decodeToken } from '../../helpers/helper'
import passport from 'passport';
import jwt from 'jsonwebtoken';

router.post('/add', validator.body(userValidator.createUserSchema, {joi: userValidator.joiOpts}), ( req, res, next ) => {

    let salt = bcrypt.genSaltSync(10);
    let newUser = new userModel ({
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, salt),
        salt:salt,
        gender:req.body.gender,
        is_admin:req.body.is_admin,
        created_at: new Date()
    });

    newUser.save((error, user) => {
        if (error){
            res.json(makeCustomError(error))
        } else {
            res.json({success: true, msg: 'Created user successfully'});
        }
    });
});

router.get('/users',
   // passport.authenticate('jwt', { session: false}),
    function(req, res) {
        userModel.find(function(err, users) {
            if (err) {
                res.send(err);            
            } else {
              res.send(users);
              //.send and .json provide same response 
               // res.json(users);
            }
        });
    }
);

module.exports = router;
