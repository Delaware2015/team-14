/**
 * @module team14/util
 */

var mailer = require('nodemailer');
var transport = mailer.createTransport();

var async = require('async');
var generator = require('password-generator');
var emailConfig = require('./config/email');

var Util = {
  emailUsers: emailUsers,
  generatePassword: generator.bind(null, 12, false)
};

function emailUsers(users, subject, body, cb) {
  async.each(users, function(user, done) {
    var mailOptions = {
      from: emailConfig.from,
      to: user.email,
      subject: subject,
      text: body
    };

    transport.sendMail(mailOptions, function(err, res) {
      if(err) {
        return done(err);
      }

      done();
    });
  }, cb);
}

module.exports = Util;
