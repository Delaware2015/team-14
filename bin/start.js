/**
 * @module team14/bin/start
 */

'use strict';

var Database = require('../db');
var Server = require('../server');

// Ensure database is connected
Database.connect(function(err) {
  if(err) {
    throw err;
  }

  // Being listening
  Server.listen(function(err) {
    if(err) {
      throw err;
    }

    console.log('Listening...');
  });
});
