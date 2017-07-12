"use strict";

var express = require('express')
    , app = express();

app.use('/v1', require('./routes/api_route'));

app.listen(3000, function() {
    console.log('Listening on port 3000...');
});
