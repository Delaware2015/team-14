/**
 * @module team14/models/admin
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
  email: String,
  password: String
});

module.exports = mongoose.model('Admin', AdminSchema);
