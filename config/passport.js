var JwtStrategy = require('passport-jwt').Strategy;
var secret = require('../server/secret.js');
var mongooseUri = secret.mongooseUri;
 
// load up the user model
var User = require('../server/models/User.js');
//var config = require(); // get db config file
 
module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = mongooseUri; //not sure this is correct
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
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