/**
 * @module team14/handlers/admin
 */

'use strict';

var Util = require('../util');
var emailConfig = require('../config/email');

var AdminHandler = {
  getLogin: getLogin,
  getHome: getHome,
  getEmail: getEmail,
  getInvite: getInvite,
  postEmail: postEmail,
  postInvite: postInvite
}

/**
 * Render Admin Login Page
 * @param {object} req
 * @param {object} res
 */
function getLogin(req, res) {
  res.render('admin/login.html', {title: 'Admin Login'});
}

/**
 * Render Admin Home Page
 * @param {object} req
 * @param {object} res
 */
function getHome(req, res) {
  res.render('admin/home.html', {title: 'Admin Home'});
}

/**
 * Render Admin Email Page
 * @param {object} req
 * @param {object} res
 */
function getEmail(req, res) {
  res.render('admin/email.html', {title: 'Admin Email'});
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
function postInvite(req, res) {
  var email = req.body.email;
  var password = Util.generatePassword();
  var subject = 'GoodWill Invite';
  var body = 'email: ' + email + '\n' +
             'password: ' + password;

  if(email) {
    // search for user in databae by email
    var user = null;
    if(user) {
      req.flash('emailMessage', 'User exists');
    } else {
      // create user
      var user = {email: 'my@email.com'};
      req.flash('emailMessage', 'User created');
      Util.emailUsers([user], subject, body, emailCallback);
    }

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
