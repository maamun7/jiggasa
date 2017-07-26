"use strict";
const secretkey = '*Config.%^secretkey*';
module.exports = {
    development: {
        host : 'localhost',
        port : '8000',
        callBack : () => {
            console.log("Running on development server with host: localhost and port: 8000");
        },
        dbHost : 'mongodb://localhost',
        dbPort : 27017,
        dbUser : '',
        dbPassword : '',
        database : 'jiggasa_db'
    },
    production: {
        host: 'localhost',
        port: 8000,
        callBack : () => {
            console.log("Running on production server with host: localhost and port: 8000");
        },
        dbHost : 'mongodb://localhost',
        dbPort : 27017,
        dbUser : '',
        dbPassword : '',
        database : 'jiggasa_db'
    },
    staging: {
        host: 'localhost',
        port: 8000,
        callBack : () => {
            console.log("Running on staging server with host: localhost and port: 8000");
        },
        dbHost : 'mongodb://localhost',
        dbPort : 27017,
        dbUser : '',
        dbPassword : '',
        database : 'jiggasa_db'
    },
    secretkey
};