var express = require('express');
var TransferData = require('../models/DogOwnershipTransferData')

var router = express.Router();

router.get('/:dogId', (req, res) => {
  TransferData.findOne({dogId: req.params.dogId, hasAddedToBlockchain: false}, (error, transfer) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!transfer) {
        console.log('Dog not available');
        res.send({msg: 'Dog not available.'});
      } else {
        console.log(transfer);
        res.status(200).send(transfer);
      }
    }
  });
});

module.exports = router