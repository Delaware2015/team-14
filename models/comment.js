/**
 * @module team14/models/comment
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  body: String,
  dateCreated: {type: Date, default: Date()}
});

module.exports = mongoose.model('Comment', CommentSchema);
