var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
import config from './config';
import User from '../app/models/api/Users';

module.exports = function(passport) {

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secretkey;

    console.log("LocalStrategy -:", ExtractJwt.fromAuthHeaderAsBearerToken());


    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        console.log("jwt_payload LOG :", jwt_payload.id);

        User.findById(jwt_payload.id, function(err, user) {
            
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};