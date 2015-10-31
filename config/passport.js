/**
 * @module team14/config/passport
 */

var mongoose = require('mongoose');

var LocalStrategy = require('passport-local');
var User = require('../models/user');
var Admin = require('../models/admin');

function configurePassport(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  var config = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  };

  var signupStrategy = new LocalStrategy(config, function(req, email, password, done) {
    User.findOne({email: email}, function(err, user) {
      if(err) {
        return done(err);
      }

      if(user) {
        return done(null, false, req.flash('signupMessage', 'User exists'));
      }

      var newUser = new User();
      newUser.fname = req.body.fname;
      newUser.lname = req.body.lname;
      newUser.email = email;
      newUser.password = newUser.createHash(password);

      newUser.save(function(err) {
        if(err) {
          return done(err);
        }

        done(null, newUser);
      });
    });
  });

  var loginStrategy = new LocalStrategy(config, function(req, email, password, done) {
    User.findOne({email: email}, function(err, user) {
      if(err) {
        return done(err);
      }

      if(!user) {
        return done(null, false, req.flash('loginMessage', 'User does not exist'));
      }

      if(!user.validatePassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Incorrect password'));
      }

      done(null, user);
    });
  });

  var adminStrategy = new LocalStrategy(config, function(req, email, password, done) {
    Admin.findOne({email: email}, function(err, admin) {
      if(!admin) {
        return done(null, false, req.flash('adminMessage', 'Admin User does not exist'));
      }

      if(admin.password !== password) {
        return done(null, false, req.flash('adminMessage', 'Incorrect password'));
      }

      done(null, admin);
    });
  });

  passport.use('local-signup', signupStrategy);
  passport.use('local-login', loginStrategy);
  passport.use('admin-login', adminStrategy);
}

module.exports = configurePassport;
