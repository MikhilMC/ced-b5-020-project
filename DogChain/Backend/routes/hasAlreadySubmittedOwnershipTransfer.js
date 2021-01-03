const express = require('express');
const OwnershipTransferData = require('../models/DogOwnershipTransferData');
var verifyToken = require('../authorize');

const router = express.Router();

router.get('/:userId/:dogId', verifyToken, (req, res) => {
  console.log(req.params)
  // Database method to find whether the current owner have already submitted
  // application to transfer ownership of this dog
  OwnershipTransferData.findOne({currentOwnerId: req.params.userId, dogId: req.params.dogId, hasAddedToBlockchain: false}, (error, transfer)=>{
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (transfer) {
        // Case : Ownership transfer request is already submitted,
        //        hence the owner can not submit this dog's ownership transfer request again
        //        without the authority approves or deletes the current request.
        console.log(transfer);
        res.send({hasAlreadySubmitted: true});
      } else {
        // Case : Ownership transfer request is not submitted,
        //        hence the owner can submit this dog's ownership transfer request
        res.send({hasAlreadySubmitted: false});
      }
    }
  });
});

module.exports = router;