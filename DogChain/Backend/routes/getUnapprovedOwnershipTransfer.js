var express = require('express');
var TransferData = require('../models/DogOwnershipTransferData')
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/:dogId', verifyToken, (req, res) => {
  // Database method to find the ownership transfer request of the dog with the given id
  TransferData.findOne({dogId: req.params.dogId, hasAddedToBlockchain: false}, (error, transfer) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!transfer) {
        // Case : The ownership transfer request of the dog with the given id is not available
        console.log('Dog not available');
        res.send({msg: 'Dog not available.'});
      } else {
        // Case : The ownership transfer request of the dog with the given id is available
        console.log(transfer);
        res.status(200).send(transfer);
      }
    }
  });
});

module.exports = router