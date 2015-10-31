/**
 * @module team14/models/user
 */

var bcrypt = require('bcrypt');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  password: String,
  fname: String,
  lname: String
});

/**
 * #createHash
 * @param {string} pass
 * @returns {string}
 */
UserSchema.methods.createHash = function(pass) {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
};

/**
 * #validatePassword
 * @param {string} pass
 * @returns {boolean}
 */
UserSchema.methods.validatePassword = function(pass) {
  return bcrypt.compareSync(pass, this.password);
};

module.exports = mongoose.model('User', UserSchema);
