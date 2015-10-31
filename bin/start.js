/**
 * @module team14/bin/start
 */

'use strict';

var Server = require('../server');

// Being listening
Server.listen(function(err) {
  if(err) {
    throw err;
  }

  console.log('Listening...');
});
