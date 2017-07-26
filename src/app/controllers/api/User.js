var express = require('express')
    , router = express.Router();
const validator = require('express-joi-validation')({ passError: true});

import userModel from '../../models/api/Users';
import userValidator from '../../validations/api/User'

router.post('/signup', validator.body(userValidator.createSchema, {joi: userValidator.joiOpts}), ( req, res, next ) => {

    let newUser = new userModel ({
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.email,
        password:req.body.password,
        gender:req.body.gender,
        is_admin:req.body.is_admin
    });

    newUser.save((error, car) => {
        if (error){
            res.json({msg: 'Failed to add car' + error});
        } else {
            res.json({msg: 'Added car successfully '});
        }
    });
});

module.exports = router;