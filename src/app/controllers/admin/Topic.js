var express = require('express')
    , router = express.Router();
const validator = require('express-joi-validation')({ passError: true});
import topicModel from '../../models/admin/Topics';
import topicValidator from '../../validations/admin/Topic';
import { makeCustomError } from '../../helpers/helper';
import jwt from 'jsonwebtoken';

router.post('/topic/add', validator.body(topicValidator.createTopiSchema, {joi: topicValidator.joiOpts}), ( req, res, next ) => {

    let newTopic = new topicModel ({
        name:req.body.name,
        created_at: new Date()
    });

    newTopic.save((error, topic) => {
        if (error){
            res.json(makeCustomError(error))
        } else {
            res.json({success: true, msg: 'Topic created successfully'});
        }
    });
});

router.get('/topics',
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
