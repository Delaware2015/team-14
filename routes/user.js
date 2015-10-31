/**
 * @module team14/routes/user
 */

'use strict';

var Router = require('express').Router;

/**
 * Creates and returns the index router
 * @param {object} indexHandler
 * @return {object}
 */
function getUserRouter(userHandler, passport) {
  var router = Router();

  router.get('/home', userHandler.getHome);
  router.get('/profile', userHandler.getProfile);
  router.get('/settings', userHandler.getSettings);
  router.get('/comment', userHandler.createComment);
  router.get('/donation', userHandler.createDonation);

  router.post('/comment', userHandler.postComment);
  router.post('/donation', userHandler.postDonation);

  return router;
}

module.exports = getUserRouter;
