/**
 * @module team14/server
 */

'use strict';

var app = require('./app');
var http = require('http');

var port = '3000';
app.set('port', port);

var server = http.createServer(app);

var Server = {
  listen: listen,
  close: close
};

/**
 * Listen on static port
 * @param {function} cb
 */
function listen(cb) {
  server.listen(port);
  server.on('error', cb);
  server.on('listening', cb);
}

/**
 * Close server
 */
function close() {
  server.close();
}

module.exports = Server;
