const mongoose = require('mongoose');

const Schema = mongoose.Schema;

BreederSchema = new Schema({
  authorityId: {type: Number},
  name: {type: String},
  email: {type: String},
  password: {type: String}
});

module.exports = mongoose.model('authority', BreederSchema);