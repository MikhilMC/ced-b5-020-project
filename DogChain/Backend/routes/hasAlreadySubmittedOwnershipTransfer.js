const express = require('express');
const OwnershipTransferData = require('../models/DogOwnershipTransferData');

const router = express.Router();

router.get('/:userId/:dogId', (req, res) => {
  console.log(req.params)
  OwnershipTransferData.findOne({currentOwnerId: req.params.userId, dogId: req.params.dogId, hasAddedToBlockchain: false}, (error, transfer)=>{
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (transfer) {
        console.log(transfer);
        res.send({hasAlreadySubmitted: true});
      } else {
        res.send({hasAlreadySubmitted: false});
      }
    }
  });
});

module.exports = router;