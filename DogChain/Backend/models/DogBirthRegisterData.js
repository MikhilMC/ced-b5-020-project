const mongoose = require('mongoose');

const Schema = mongoose.Schema;

DogBirthRegisterSchema = new Schema({
  dogId: {type: Number},
  dogName: {type: String},
  breed: {type: String},
  colour: {type: String},
  sex: {type: String},
  dob: {type: String},
  fatherId: {type: Number},
  motherId: {type: Number},
  breederId: {type: Number},
  hasAddedToBlockchain: {type: Boolean}
});

module.exports = mongoose.model('dogBirthRegister', DogBirthRegisterSchema);