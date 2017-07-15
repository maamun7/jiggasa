"use strict";

import express from 'express';
const app = express();
import swagger from 'swagger-node-express';
import config from '../config/config'

import apiRoute from './routes/api_route'

app.use('/v1', apiRoute);


app.listen(config.development.port, config.development.host,  config.development.callBack());


//swagger.setAppHandler(app);
