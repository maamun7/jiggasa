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

    let question = new questionModel ({
        title:req.body.title,
        topicId:req.body.topicId,
        createdBy:req.body.createdBy
    });

    question.save((err) => {
        if (err){
            res.json(makeCustomError(err))
        } else {
            res.json({success: true, msg: 'Question created successfully'});
        }
    });
});

router.post('/question/answer', validator.body(questionValidator.answerSchema, {joi: questionValidator.joiOpts}), ( req, res, next ) => {

    let updateObj = {
        answer: req.body.answer,
        createdBy: req.body.createdBy
    };

    let bulk = db.questionModel.initializeUnorderedBulkOp();
    bulk.find( { _id: req.body.questionId } ).update( { $pull: { "answers": { "createdBy": req.body.createdBy } } } );
    bulk.find( { _id: req.body.questionId } ).update( { $addToSet: { "answers": updateObj } } );
    bulk.execute();

    res.json({success: true, msg: 'Question created updated'});
});

module.exports = router;
