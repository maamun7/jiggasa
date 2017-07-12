var express = require('express')
    , router = express.Router()

// Domestic animals page
router.get('/domestic', function(req, res) {
    res.send('Cow, Horse, Sheep')
})

// Wild animals page
router.get('/wild', function(req, res) {
    res.send('Wolf, Fox, Eagle')
})

module.exports = router;