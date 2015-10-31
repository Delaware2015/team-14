/**
 * @module team14/handlers/index
 */

'use strict';

var IndexHandler = {
  getIndex: getIndex,
  getSignup: getSignup,
  getLogin: getLogin
}

/**
 * Render Index Page
 * @param {object} req
 * @param {object} res
 */
function getIndex(req, res) {
  res.render('index.html', {title: 'Index'})
}

/**
 * Render Signup Page
 * @param {object} req
 * @param {object} res
 */
function getSignup(req, res) {
  res.render('signup.html', {title: 'Signup'})
}

/**
 * Render Login Page
 * @param {object} req
 * @param {object} res
 */
function getLogin(req, res) {
  res.render('login.html', {title: 'Login'})
}

module.exports = IndexHandler;
