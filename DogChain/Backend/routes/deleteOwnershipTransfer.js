var express = require('express');
var TransferData = require('../models/DogOwnershipTransferData');
var verifyToken = require('../authorize');

var router = express.Router();

router.delete('/:dogId', verifyToken, (req, res) => {
  console.log(req.params.dogId);
  TransferData.findOneAndDelete({dogId: req.params.dogId}, (error, transfer) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      console.log(transfer);
      res.status(200).send(transfer);
    }
  });
});

module.exports = router;