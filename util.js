/**
 * @module team14/util
 */

var mailer = require('nodemailer');
var transport = mailer.createTransport();

var async = require('async');

var Util = {
  emailUsers: emailUsers
};

function emailUsers(users, subject, body, cb) {
  async.each(users, function(user, done) {
    var mailOptions = {
      from: 'chrismwhelan95@gmail.com',
      to: user.email,
      subject: 'please',
      text: 'work'
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
