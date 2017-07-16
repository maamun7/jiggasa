"use strict";

import express from 'express';
const app = express();
import swagger from 'swagger-node-express';
import config from '../config/config'

import apiRoute from './routes/api_route'

var mongoose = require('mongoose');

app.use('/v1', apiRoute);
mongoose.createConnection('mongodb://localhost:27017/cars');
//mongoose.connect('mongodb://localhost:27017/cars');
mongoose.connection.on('connection', () => {
    console.log('Connect to the database mongodb @ 27017');
});

mongoose.connection.on('error', (err) => {
    if (err){
        console.log('Error when connect to the mongodb @ 27017');
    }
});


app.listen(config.development.port, config.development.host, config.development.callBack());


//swagger.setAppHandler(app);
