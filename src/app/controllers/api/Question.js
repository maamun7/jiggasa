var express = require('express')
    , router = express.Router();
const validator = require('express-joi-validation')({ passError: true});
import questionModel from '../../models/api/Question';
import topicModel from '../../models/admin/Topics';
import questionValidator from '../../validations/api/Question';
import { makeCustomError } from '../../helpers/helper';
import jwt from 'jsonwebtoken';


router.get('/questions',
   // passport.authenticate('jwt', { session: false}),
    (req, res) => {
        questionModel.find((err, topics) => {
            if (err) {
                res.send(err);            
            } else {
              res.send(topics);
            }
        });
    }
);

router.get('/question/topics',
   // passport.authenticate('jwt', { session: false}),
    (req, res) => {
        topicModel.find((err, topics) => {
            if (err) {
                res.send(err);            
            } else {
              res.send(topics);
            }
        });
    }
);

router.post('/question/add', validator.body(questionValidator.questionSchema, {joi: questionValidator.joiOpts}), ( req, res, next ) => {

    let newQuestion = new questionModel ({
        title:req.body.title,
        topicId:req.body.topicId,
        createdBy:req.body.createdBy,
        createdAt: new Date(),
      //  answers:[{_id: 5, name: 'aaa'} , {_id: 6, name: 'bbb'}]
        answers:[]
    });

    newQuestion.save((error, topic) => {
        if (error){
            res.json(makeCustomError(error))
        } else {
            res.json({success: true, msg: 'Question created successfully'});
        }
    });
});

module.exports = router;
