var express = require('express')
    , router = express.Router();
const validator = require('express-joi-validation')({ passError: true});
import Search from '../../models/api/Search';
import Topic from '../../models/admin/Topics';
import questionValidator from '../../validations/api/Question';
import { makeCustomError } from '../../helpers/helper';
import jwt from 'jsonwebtoken';

router.get('/search', (req, res) => {
        Search.find({$text: {$search: req.query.keyword} })
       .exec((err, docs) => { 
            if (err) {
                res.send(err);            
            } else {
                res.send(docs);
            }
        });
});

module.exports = router;
