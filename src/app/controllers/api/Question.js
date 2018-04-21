var express = require('express')
    , router = express.Router();
const validator = require('express-joi-validation')({ passError: true});
import Question from '../../models/api/Question';
import Topic from '../../models/admin/Topics';
import questionValidator from '../../validations/api/Question';
import { makeCustomError } from '../../helpers/helper';
import jwt from 'jsonwebtoken';


router.get('/questions',
   // passport.authenticate('jwt', { session: false}),
    (req, res) => {
        Question.find((err, topics) => {
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
        Topic.find((err, topics) => {
            if (err) {
                res.send(err);            
            } else {
              res.send(topics);
            }
        });
    }
);

router.post('/question/add', validator.body(questionValidator.questionSchema, {joi: questionValidator.joiOpts}), ( req, res, next ) => {

    let question = new Question ({
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

router.post('/question/answer', validator.body(questionValidator.answerSchema, { joi: questionValidator.joiOpts } ), ( req, res, next ) => {

    let answer = {
        answer: req.body.answer,
        createdBy: req.body.createdBy
    };

    Question.findOne({ _id : req.body.questionId },
        (err, item) => {
            //If happen error that means did not found answer by the user id
            //, 'answers.createdBy': req.body.createdBy 
            if (err) {
                console.log('Error occur :', 'Yes !');
            } else {
                let answerArray = item.answers;
                let existAnswer = answerArray.find(key => key.createdBy == req.body.createdBy);
                if( typeof existAnswer === 'undefined' ) {
                    //Insert
                    Question.update(
                        { _id: req.body.questionId },
                        { 
                            $push : { answers: answer } 
                        },
                        (error, success) => {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Successfully added answer');
                            }
                        });
                } else {
                    //Update
                    Question.update(
                        { _id: req.body.questionId, 'answers.createdBy' : req.body.createdBy },
                        { $set: { "answers": { answer: req.body.answer, updatedAt: new Date() } } } ,
                        (error, success) => {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(success);
                            }
                        });
                }
            }
        });

  /*   Question.update(
        { _id: req.body.questionId },
        { $pull: { "answers": { createdBy: req.body.createdBy } } },
        (error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }

        });
    Question.update(
        { _id: req.body.questionId },
        { $addToSet: { "answers": answer } } ,
        (error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        }); */

  /*  let bulk = Question.collection.initializeUnorderedBulkOp();
    bulk.find( { _id: req.body.questionId } ).update( { $pull: { "answers": { createdBy: req.body.createdBy } } } );
    bulk.find( { _id: req.body.questionId } ).update( { $addToSet: { "answers": updateObj } } );
    bulk.execute(); */

    res.json({success: true, msg: 'Question updated'});
});

module.exports = router;
