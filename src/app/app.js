"use strict";

import express from 'express';
const app = express();
// import swagger from 'swagger-node-express';
import bodyParser from 'body-parser';
import config from '../config/config';
import apiRoute  from './routes/api_route';
import passport from 'passport';

//Connect with database
require('../config/database');

// Configure json web token (jwt)
require('../config/passport')(passport);
app.use(passport.initialize());

//Set body parser, must be use at before calling any controller
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set cross origin
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// All routes
app.use('/v1', apiRoute);

//Start server
app.listen(config.development.port, config.development.host, config.development.callBack());

//Custom Error handling
app.use((err, req, res, next) => {
    if (err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.status(400).json({
           // type: err.type, // will be "query" here, but could be "headers", "body", or "params"
            msg: err.error.toString(),
            error: {}
        });

    } else {
        // pass on to another error handler
        next(err);

    }
});
