var express = require('express')
    , router = express.Router();
const validator = require('express-joi-validation')({ passError: true});
import userModel from '../../models/api/Users';
import userValidator from '../../validations/api/User';
import bcrypt from 'bcrypt';

router.post('/signup', validator.body(userValidator.signupSchema, {joi: userValidator.joiOpts}), ( req, res, next ) => {

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
            res.json({msg: 'Failed to add user' + error});
        } else {
            res.json({msg: 'Added car successfully'});
        }
    });
});

router.post('/signin', validator.body(userValidator.signinSchema, {joi: userValidator.joiOpts}), ( req, res, next ) => {

    userModel.findOne({ 'email': req.body.email }, function (err, user) {
        if (null !== err) {
           res.json({msg: 'Error occurred' + err});
        } else {
            if ( bcrypt.compareSync(req.body.password, user.password) ){
                res.json({
                    success : true,
                    name : user.name,
                    mobile : user.mobile,
                    email : user.email,
                    gender : user.gender
                });
            } else {
                res.json({msg: `Doesn't match email or password`});
            }
        }
    });
});

module.exports = router;
