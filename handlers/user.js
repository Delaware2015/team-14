/**
 * @module team14/handlers/user
 */

'use strict';

var User = require('../models/user');
var Donation = require('../models/donation');

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
  res.render('user/home.html', {title: 'Home'});
}

/**
 * Render Profile Page
 * @param {object} req
 * @param {object} res
 */
function getProfile(req, res) {
  Donation.find({userId: req.user.id}, function(err, donations) {
    if(err) {
      console.log(err);
    }

    res.render('user/profile.html', {title: 'Profile', donations: donations});
  });
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
  res.render('user/donation.html', {title: 'Comment'});
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

// this is not right at all
// TODO get your shit together
/**
 * Post Donation
 * @param {object} req
 * @param {object} res
 */
function postDonation(req, res) {
  res.render('user/donation.html', {title: 'Comment'});
}

module.exports = UserHandler;
