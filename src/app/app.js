"use strict";

import express from 'express';
const app = express();
// import swagger from 'swagger-node-express';
import bodyParser from 'body-parser'
import config from '../config/config'
import apiRoute from './routes/api_route'

//Connect with database
require('../config/database');

//Must be use at before calling any controller
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/v1', apiRoute);

app.listen(config.development.port, config.development.host, config.development.callBack());

//swagger.setAppHandler(app);

//Custom Error handling
app.use((err, req, res, next) => {

    if (err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.status(400).json({
            type: err.type, // will be "query" here, but could be "headers", "body", or "params"
            message: err.error.toString()
        });

    } else {
        // pass on to another error handler
        next(err);

    }
});
