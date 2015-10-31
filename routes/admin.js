/**
 * @module team14/routes/admin
 */

'use strict';

var Router = require('express').Router;

/**
 * Creates and returns the admin router
 * @param {object} adminHandler
 * @return {object}
 */
function getAdminRouter(adminHandler, passport) {
  var router = Router();

  router.get('/login', adminHandler.getLogin);
  router.get('/home', adminHandler.getHome);
  router.get('/email', adminHandler.getEmail);
  router.get('/invite', adminHandler.getInvite);
  router.get('/stats', adminHandler.getStats);

  var loginConfig = {
    successRedirect: '/admin/home',
    failureRedirect: '/admin/login',
    failureFlash: true
  };

  router.post('/login', passport.authenticate('admin-login', loginConfig));
  router.post('/email', adminHandler.postEmail);
  router.post('/invite', adminHandler.postInvite);

  return router;
}

module.exports = getAdminRouter;
