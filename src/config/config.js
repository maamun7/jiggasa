"use strict";
const secretkey = '*Config.%^secretkey*';
module.exports = {
    development: {
        host : 'localhost',
        port : '8000',
        callBack : () => {
            console.log("Running on development server with host: localhost and port: 8000");
        }
    },
    production: {
        host: 'localhost',
        port: 8000,
        callBack : () => {
            console.log("Running on production server with host: localhost and port: 8000");
        }
    },
    staging: {
        host: 'localhost',
        port: 8000,
        callBack : () => {
            console.log("Running on staging server with host: localhost and port: 8000");
        }
    },
    secretkey
};