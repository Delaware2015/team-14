/**
 * @module team14/handlers/admin
 */

'use strict';

var User = require('../models/user');
var Donation = require('../models/donation');
var Comment = require('../models/comment');
var Util = require('../util');
var emailConfig = require('../config/email');

var AdminHandler = {
  getLogin: getLogin,
  getHome: getHome,
  getEmail: getEmail,
  getInvite: getInvite,
  getStats: getStats,
  getComments: getComments,
  postEmail: postEmail,
  postInvite: postInvite
}

/**
 * Render Admin Login Page
 * @param {object} req
 * @param {object} res
 */
function getLogin(req, res) {
  res.render('admin/login.html', {
    title: 'Admin Login',
    message: req.flash('adminMessage')
  });
}

/**
 * Render Admin Home Page
 * @param {object} req
 * @param {object} res
 */
function getHome(req, res) {
  Donation.find({}, function(err, donations) {
    if(err) {
      console.log(err);
    }

    User.find({}, function(err, users) {
      res.render('admin/home.html', {
        title: 'Admin Home',
        donations: donations,
        users: users,
        layout: false
      });
    });
  });
}

/**
 * Render Admin Email Page
 * @param {object} req
 * @param {object} res
 */
function getEmail(req, res) {
  res.render('admin/email.html', {
    title: 'Admin Email',
    layout: false
  });
}

/**
 * Render Admin Invite Page
 * @param {object} req
 * @param {object} res
 */
function getInvite(req, res) {
  res.render('admin/invite.html', {title: 'Admin Email'});
}

/**
 * Render Admin Stats Page
 * @param {object} req
 * @param {object} res
 */
function getStats(req, res) {
  res.render('admin/statistics.html', {title: 'Admin Stats'});
}

/**
 * Render Admin Comments Page
 * @param {object} req
 * @param {object} res
 */
function getComments(req, res) {
  Comment.find({}, function(err, comments) {
    if(err) {
      console.log(err);
    }

    res.render('admin/feedback.html', {
      title: 'Admin Feedback',
      comments: comments
    });
  });
}

/**
 * Send out emails
 * @param {object} req
 * @param {object} res
 */
function postEmail(req, res) {
  var location = req.body.location;
  var body = req.body.body;

  // need to decide the different options available
  // query for users
  var users = [{email: 'chrismwhelan95@gmail.com'}];
  processUsers(users);

  function processUsers(users) {
    Util.emailUsers(users, subject, body, function(err) {
      if(err) {
        req.flash('emailMessage', 'Failed to Send');
      } else {
        req.flash('emailMessage', 'Email Sent');
      }

      res.redirect('/admin/email');
    });
  }
}

/**
 * Create user and send invitation
 * @param {object} req
 * @param {object} res
 */
function postInvite(req, res, next) {
  var email = req.body.email;
  var password = Util.generatePassword();
  var subject = 'GoodWill Invite';
  var body = 'email: ' + email + '\n' +
             'password: ' + password;

  if(email) {
    User.findOne({email: email}, function(err, user) {
      if(err) {
        return next(err);
      }

      if(user) {
        req.flash('emailMessage', 'User exists');
      } else {
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.createHash(password);

        newUser.save(function(err) {
          req.flash('emailMessage', 'User created');
          Util.emailUsers([user], subject, body, emailCallback);
        });
      }
    });

    function emailCallback() {
      if(err) {
        req.flash('emailMessage', 'Failed to Send');
      } else {
        req.flash('emailMessage', 'Email Sent');
      }

      res.redirect('/admin/email');
    }
  }
}

module.exports = AdminHandler;
