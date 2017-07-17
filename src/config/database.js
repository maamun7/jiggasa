"use strict";
import mongoose from 'mongoose';
let dbHost = 'mongodb://localhost';
let dbPort = 27017;
let dbUser = '';
let dbPassword = '';
let database = 'cars';

const uri  = `${dbHost}:${dbPort}/${database}`;

var options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    replset: { rs_name: 'myReplicaSetName' },
    user: dbUser,
    pass: dbPassword
};

mongoose.connect(uri, options, (err) => {
    if (err) {
        console.log(`Unable to connect with mongodb at @host: ${dbHost}  @port: ${dbPort} @database: ${database}`);
    } else {
        console.log(`Established connection with mongodb at @host: ${dbHost}  @port: ${dbPort} @database: ${database}`);
    }
});