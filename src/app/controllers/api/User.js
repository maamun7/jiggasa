var express = require('express')
    , router = express.Router();
const validator = require('express-joi-validation')({ passError: true});
import userModel from '../../models/api/Users';
import userValidator from '../../validations/api/User';
import bcrypt from 'bcrypt';
import { makeCustomError, generateToken } from '../../helpers/helper'

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
        if (null !== err) {
           res.json({msg: 'Error occurred' + err});
        } else {
            if ( bcrypt.compareSync(req.body.password, user.password) ){
                let tokenInfo = { name: user.name, email: user.email, id: user._id };

                res.json({
                    success : true,
                    name : user.name,
                    email : user.email,
                    token : 'JWT ' +generateToken(tokenInfo)
                });
            } else {
                res.json({msg: `Doesn't match email or password`});
            }
        }
    });
});

module.exports = router;
