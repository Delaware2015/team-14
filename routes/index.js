/**
 * @module team14/routes/index
 */

'use strict';

var Router = require('express').Router;

/**
 * Creates and returns the index router
 * @param {object} indexHandler
 * @return {object}
 */
function getIndexRouter(indexHandler, passport) {
  var router = Router();

  router.get('/', indexHandler.getIndex);
  router.get('/signup', indexHandler.getSignup);
  router.get('/login', indexHandler.getLogin);

  var signupConfig = {
    successRedirect: '/user/home',
    failureRedirect: '/signup',
    failureFlash: true
  };

  var loginConfig = {
    successRedirect: '/user/home',
    failureRedirect: '/login',
    failureFlash: true
  };

  router.post('/signup', passport.authenticate('local-signup', signupConfig));
  router.post('/login', passport.authenticate('local-login', loginConfig));

  return router;
}

module.exports = getIndexRouter;
