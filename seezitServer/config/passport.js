const JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt;
var mongoose = require('mongoose')
var User = mongoose.model("users")
var keys = require('../config/keys')


const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload)
            .then((user) => {
                if(user) {
                    return done(null, user);
                }
                return (null, false)
            })
            .catch(errr => console.log(err))
        })
    )
}