var express = require('express')
    , router = express.Router();
const validator = require('express-joi-validation')({ passError: true});
import userModel from '../../models/api/Users';
import userValidator from '../../validations/api/User';
import bcrypt from 'bcrypt';
import { makeCustomError, generateToken, decodeToken } from '../../helpers/helper'
import passport from 'passport';
import jwt from 'jsonwebtoken';

router.post('/signup', validator.body(userValidator.signupSchema, {joi: userValidator.joiOpts}), ( req, res, next ) => {

    let salt = bcrypt.genSaltSync(10);
    let newUser = new userModel ({
        name:req.body.name,
       // mobile:req.body.mobile,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, salt),
        salt:salt,
       // gender:req.body.gender,
        is_admin:req.body.is_admin,
        created_at: new Date()
    });

    newUser.save((error, user) => {
        if (error){
            res.json(makeCustomError(error))
        } else {
            res.json({success: true, msg: 'Successfully user registered'});
        }
    });
});

router.post('/signin', validator.body(userValidator.signinSchema, {joi: userValidator.joiOpts}), ( req, res, next ) => {

    userModel.findOne({ 'email': req.body.email }, function (err, user) {

        if (null !== user) {
            if ( bcrypt.compareSync(req.body.password, user.password) ) {
                let tokenInfo = { name: user.name, email: user.email, id: user._id };
                res.json({
                    success : true,
                    token : 'JWT ' +generateToken(tokenInfo)
                });
            }
        } else {
            res.json({
                success : false,
                msg: `Doesn't match email or password`
            });
        }

        if (err) {
            res.json({msg: 'Error occurred' + err});
        }
    });
});

router.get('/oauth_token',
    passport.authenticate('jwt', { session: false}),
    (req, res) => {
        const token = req.headers.authorization;
        const userIdInToken = decodeToken(token);

        userModel.findOne({ '_id': userIdInToken }, function (err, user) {
            if (null !== err) {
                res.json({msg: 'Error occurred' + err});
            } else {
                let users = [];
                users['jjjj'] = 5;
                res.json({
                    success : true,
                    msg : 'Success',
                    id : user._id,
                    entities : {
                        users : { [user._id] : { name: user.name, email: user.email } }
                    }
                });
            }
        });
    });

module.exports = router;
