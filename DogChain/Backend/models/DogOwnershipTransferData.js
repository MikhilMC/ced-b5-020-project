const mongoose = require('mongoose');

const Schema = mongoose.Schema;

DogOwnershipTransferSchema = new Schema({
  dogId: {type: Number},
  currentOwnerId: {type: Number},
  newOwnerId: {type: Number},
  hasAddedToBlockchain: {type: Boolean}
});

module.exports = mongoose.model('dogOwnershipTransfer', DogOwnershipTransferSchema);