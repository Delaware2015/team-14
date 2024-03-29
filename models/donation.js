/**
 * @module team14/models/donation
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var DonationSchema = new Schema({
  receiptId: String,
  userId: ObjectId,
  amount: Number,
  dateCreated: {type: Date, default: Date()},
  items: {type: Array, default: []}
});

module.exports = mongoose.model('Donation', DonationSchema);
