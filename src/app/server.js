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
