var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
import config from './config';
import User from '../app/models/api/Users';

module.exports = function(passport) {

    var options = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey : config.secretkey
    };

    passport.use(new JwtStrategy(options, function(jwt_payload, next) {

        User.findById(jwt_payload._id, function(err, user) {
            if (err) {
                return next(err, false);
            }
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        });
    }));
};