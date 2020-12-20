const mongoose = require('mongoose');

const Schema = mongoose.Schema;

BreederSchema = new Schema({
  userId: {type: Number},
  name: {type: String},
  email: {type: String},
  password: {type: String},
  hasAddedToBlockchain: {type: Boolean}
});

module.exports = mongoose.model('breeders', BreederSchema);