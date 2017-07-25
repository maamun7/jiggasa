var express = require('express')
    , router = express.Router();

import Car from '../../models/car';
const validator = require('express-joi-validation')({ passError: true});
import carValidator from '../../validations/api/car'

// Domestic animals page
router.get('/domestic', function(req, res) {
    res.send('Cow, Horse, Sheep, Sheep, Sheep');
});

// Wild animals page
router.get('/wild', ( req, res, next ) => {
    // res.send('Wolf, Fox, Eagle, Cobra, Tiger');
    Car.find(function (err, cars) {
        res.json(cars);
    });
});

//Added car
router.post('/wild', validator.body(carValidator.createSchema, {joi: carValidator.joiOpts}), ( req, res, next ) => {

    let newCar = new Car ({
        car_name:req.body.car_name,
        car_brand:req.body.car_brand,
        make_year:req.body.make_year
    });

    newCar.save((error, car) => {
        if (error){
            res.json({msg: 'Failed to add car' + error});
        } else {
            res.json({msg: 'Added car successfully '});
        }
    });
});

module.exports = router;