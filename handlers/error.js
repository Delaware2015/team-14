/**
 * @module team14/handlers/error
 */

var ErrorHandler = {
  pageNotFound: pageNotFound,
  handlePageError: handlePageError
};

/**
 * Page not found error
 * @param {object}   req
 * @param {object}   res
 * @param {function} next
 */
function pageNotFound(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}

/**
 * Generic page error
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function handlePageError(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
}

module.exports = ErrorHandler;
