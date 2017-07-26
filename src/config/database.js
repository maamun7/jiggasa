"use strict";
import mongoose from 'mongoose';
//import config from 'config';
import config from '../config/config'

const uri  = `${config.development.dbHost}:${config.development.dbPort}/${config.development.database}`;

var options = {
    db: { native_parser: true },
    server: {
        poolSize: 5,
        auto_reconnect: true,
        reconnectTries: 100,
        reconnectInterval: 5000
    },
    replset: { rs_name: 'myReplicaSetName' },
    user: config.development.dbUser,
    pass: config.development.dbPassword
};

mongoose.connect(uri, options, (err) => {
    if (err) {
        console.log(`Unable to connect with mongodb at @host: ${config.development.dbHost}  @port: ${config.development.dbPort} @database: ${config.development.database}`);
    } else {
        console.log(`Established connection with mongodb at @host: ${config.development.dbHost}  @port: ${config.development.dbPort} @database: ${config.development.database}`);
    }
});

