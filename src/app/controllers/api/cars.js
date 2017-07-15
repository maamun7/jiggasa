var express = require('express')
    , router = express.Router();

// Domestic animals page
router.get('/domestic', function(req, res) {
    res.send('Cow, Horse, Sheep, Sheep, Sheep');
});

// Wild animals page
router.get('/wild', ( req, res ) => {
    res.send('Wolf, Fox, Eagle, Cobra, Tiger');
});

module.exports = router;