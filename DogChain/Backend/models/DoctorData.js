const mongoose = require('mongoose');

const Schema = mongoose.Schema;

DoctorSchema = new Schema({
  doctorId: {type: Number},
  name: {type: String},
  email: {type: String},
  hospital: {type: String, required: true},
  password: {type: String},
  hasAddedToBlockchain: {type: Boolean}
});

module.exports = mongoose.model('doctors', DoctorSchema);