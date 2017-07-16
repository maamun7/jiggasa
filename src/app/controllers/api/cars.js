var express = require('express')
    , router = express.Router();

import Cars from '../../models/car'

// Domestic animals page
router.get('/domestic', function(req, res) {
    res.send('Cow, Horse, Sheep, Sheep, Sheep');
});

// Wild animals page
router.get('/wild', ( req, res, next ) => {
    // res.send('Wolf, Fox, Eagle, Cobra, Tiger');
    Cars.find(function (err, cars) {
        res.json(cars);
    })
});

module.exports = router;