var express = require('express')
    , router = express.Router();
const validator = require('express-joi-validation')({ passError: true});
import questionModel from '../../models/api/Question';
import topicModel from '../../models/admin/Topics';
import questionValidator from '../../validations/api/Question';
import { makeCustomError } from '../../helpers/helper';
import jwt from 'jsonwebtoken';

router.post('/question/add', validator.body(questionValidator.questionSchema, {joi: questionValidator.joiOpts}), ( req, res, next ) => {

    let newQuestion = new questionModel ({
        name:req.body.name,
        created_at: new Date()
    });

    newQuestion.save((error, topic) => {
        if (error){
            res.json(makeCustomError(error))
        } else {
            res.json({success: true, msg: 'Topic created successfully'});
        }
    });
});

router.get('/question/topics',
   // passport.authenticate('jwt', { session: false}),
    (req, res) => {
        topicModel.find((err, topics) => {
            if (err) {
                res.send(err);            
            } else {
              res.send(topics);
              //.send and .json provide same response 
               // res.json(users);
            }
        });
    }
);

module.exports = router;
