require("dotenv").config();
const User = require('../models/user')

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "top_secret"; //un problema que estabas teniendo es que no te coincidian los secretos
module.exports = new JwtStrategy(opts, function (jwt_payload, done) {
  console.log(jwt_payload);
  User.findOne({ id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
});
