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
function getIndexRouter(indexHandler) {
  var router = Router();

  router.get('/', indexHandler.getIndex);

  return router;
}

module.exports = getIndexRouter;
