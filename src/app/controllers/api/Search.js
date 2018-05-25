var express = require('express')
    , router = express.Router();
const validator = require('express-joi-validation')({ passError: true});
import Search from '../../models/api/Search';
import Topic from '../../models/admin/Topics';
import questionValidator from '../../validations/api/Question';
import { makeCustomError } from '../../helpers/helper';
import jwt from 'jsonwebtoken';

router.get('/search', (req, res) => {
    console.log('res :', res);

    Search.findOne({ $text: { $search: req.query.keyword } })
    .exec(function(err, questions) {
        if (err) {
            res.json({success : false, msg: 'Error occurred' + err});
        } else {
            res.json({
                success : true,
                msg : 'Success',
                data : questions
            });
        }
    });
});

module.exports = router;
