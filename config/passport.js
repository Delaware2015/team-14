/**
 * @module team14/config/passport
 */

var LocalStrategy = require('passport-local');

function configurePassport(passport) {
  passport.serializeUser(function() {

  });

  passport.deserializeUser(function() {

  });

  var config = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  };

  var signupStrategy = new LocalStrategy(config, function(req, email, password, done) {
    // search for user in database
    // fix when real...
    var user = null;
    if(user) {
      return done(null, false, req.flash('signupMessage', 'User exists'));
    }

    // create a new user and add to table
    var newUser = {email: 'my@email.com', password: 'password'};
    done(newUser);
  });

  var loginStrategy = new LocalStrategy(config, function(req, email, password, done) {
    // search for user in database
    // fix when real...
    var newUser = {email: 'my@email.com', password: 'password'};
    if(!user) {
      return done(null, false, req.flash('loginMessage', 'User does not exist'));
    }

    // these should be hashed and salted... later
    if(!user.password === password) {
      return done(null, false, req.flash('loginMessage', 'Incorrect password'));
    }

    done(null, user);
  });

  passport.use('local-signup', signupStrategy);
  passport.use('local-login', loginStrategy);
}

module.exports = configurePassport;
