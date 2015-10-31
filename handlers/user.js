/**
 * @module team14/handlers/user
 */

'use strict';

var User = require('../models/user');
var Donation = require('../models/donation');
var Comment = require('../models/comment');

var UserHandler = {
  getHome: getHome,
  getProfile: getProfile,
  getSettings: getSettings,
  createComment: createComment,
  createDonation: createDonation,
  postComment: postComment,
  postDonation: postDonation
}

/**
 * Render Home Page
 * @param {object} req
 * @param {object} res
 */
function getHome(req, res) {
  Donation.find({}, function(err, donations) {
    if(err) {
      console.log(err);
    }
    console.log(req.user);

    res.render('user/home.html', {
      title: 'Profile',
      donations: donations,
      user: req.user
    });
  });
}

/**
 * Render Profile Page
 * @param {object} req
 * @param {object} res
 */
function getProfile(req, res) {
}

/**
 * Render Settings Page
 * @param {object} req
 * @param {object} res
 */
function getSettings(req, res) {
  User.findById(req.user.id, function(err, user) {
    if(err) {
      console.log(err);
    }

    res.render('user/settings.html', {title: 'Settings', user: user});
  });
}

/**
 * Render Comment Page
 * @param {object} req
 * @param {object} res
 */
function createComment(req, res) {
  res.render('user/comment.html', {title: 'Comment'});
}

/**
 * Render Comment Page
 * @param {object} req
 * @param {object} res
 */
function createDonation(req, res) {
  res.render('user/donation.html', {title: 'Donate'});
}

/**
 * Post Comment
 * @param {object} req
 * @param {object} res
 */
function postComment(req, res) {
  var body = req.body.body;
  if(body) {
    var comment = new Comment();
    comment.body = body;

    comment.save(function(err) {
      if(err) {
        console.log(err);
      }

      res.redirect('/user/home');
    });
  } else {
    res.redirect('/user/home');
  }
}

/**
 * Post Donation
 * @param {object} req
 * @param {object} res
 */
function postDonation(req, res) {
  var amount = req.body.amount;
  var receipt = req.body.receipt;
  var donation = new Donation();

  donation.amount = amount;
  donation.receiptId = receipt;
  donation.save(function(err) {
    if(err) {
      console.log(err);
    }

    res.redirect('/user/home');
  });
}

module.exports = UserHandler;
