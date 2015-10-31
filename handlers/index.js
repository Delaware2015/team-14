/**
 * @module team14/handlers/index
 */

'use strict';

var IndexHandler = {
  getIndex: getIndex
}

/**
 * Render Index Page
 * @param {object} req
 * @param {object} res
 */
function getIndex(req, res) {
  res.render('index.html', {title: 'Express'})
}

module.exports = IndexHandler;
