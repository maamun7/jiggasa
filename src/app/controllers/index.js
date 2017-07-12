var express = require('express')
    , router = express.Router()

router.use('/cars', require('./v1/cars'))

router.get('/', function(req, res) {
    res.send('Home page')
})

module.exports = router