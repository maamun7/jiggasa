var express = require('express')
    , router = express.Router();
const validator = require('express-joi-validation')({ passError: true});
import userModel from '../../models/api/Users';
import userValidator from '../../validations/api/User';
import bcrypt from 'bcrypt';

router.post('/signup', validator.body(userValidator.createSchema, {joi: userValidator.joiOpts}), ( req, res, next ) => {

    userModel.findOne({ 'mobile': req.body.mobile }, function (err, user) {
        if (err) {
            res.json({msg: 'Error occured' + err});
        } else {
            res.json({msg: 'Mobile number has already been taken'});
        }
    });

    let salt = bcrypt.genSaltSync(10);
    let newUser = new userModel ({
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, salt),
        salt:salt,
        gender:req.body.gender,
        is_admin:req.body.is_admin,
        created_at:'2017-07-27'
    });

    newUser.save((error, user) => {
        if (error){
            res.json({msg: 'Failed to add car' + error});
        } else {
            res.json({msg: 'Added car successfully'});
        }
    });
});

module.exports = router;