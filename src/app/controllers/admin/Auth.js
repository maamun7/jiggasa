var express = require('express')
    , router = express.Router();
const validator = require('express-joi-validation')({ passError: true});
import userModel from '../../models/admin/Auth';
import userValidator from '../../validations/admin/Auth';
import bcrypt from 'bcrypt';
import { makeCustomError, generateToken, decodeToken } from '../../helpers/helper'
import passport from 'passport';
import jwt from 'jsonwebtoken';

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

router.post('/login', validator.body(userValidator.signinSchema, {joi: userValidator.joiOpts}), ( req, res, next ) => {

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

module.exports = router;
