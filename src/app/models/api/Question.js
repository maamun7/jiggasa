"use strict";
const mongoose = require('mongoose');
mongoose.Promise = Promise;
import uniqueValidator from 'mongoose-unique-validator';

const createQuestionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',        
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',    
        required: true
    },

    image: {
        type: String,
        unique: false,
        default: "Dummy.jpg"
    },        

    likes: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],

    answers: [
        {
            answer: String,
            createdBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            votes: [
                {
                    user_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User'
                    }
                }
            ],
            createdAt: { 
                type: Date,
                default:  new Date()
            }
        }
    ],

    status: {
        type: Number,
        default: 1
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});

createQuestionSchema.plugin(uniqueValidator);

try {
    const Question =  module.exports = mongoose.model('Questions', createQuestionSchema);
}
catch(e) {
    console.log("Model already exist");
}