var express = require('express');
var TransferData = require('../models/DogOwnershipTransferData');
var verifyToken = require('../authorize')

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  console.log(req.body.dogId);
  // Database method to find the ownership transfer request with the given id.
  TransferData.findOne({dogId: req.body.dogId}, (error1, transfer1) => {
    if (error1) {
      console.log(error1);
      res.status(401).send(error1);
    } else {
      web3.eth.getAccounts()
      .then(accounts => {
        // Smart contract method to transfer the ownership of this dog 
        MyContract.methods.transferDogOwnership(
          transfer1.dogId, 
          transfer1.currentOwnerId, 
          transfer1.newOwnerId
        )
        .send({from: accounts[0]})
        .then(txn => {
          console.log(txn);
          // Database method to update the value of the field hasAddedToBlockchain to true
          // indicating that this ownership transfer request is approved by the authority.
          TransferData.findOneAndUpdate({dogId: transfer1.dogId}, {hasAddedToBlockchain: true}, null, (error3, transfer2) => {
            if (error3) {
              console.log(error3);
              res.status(401).send(error3);
            } else {
              console.log(transfer2);
              res.status(200).send({txn, transfer: transfer2});
            }
          });
        })
        .catch(error2 => {
          console.log(error2);
          res.status(401).send(error2);
        });
      });
    }
  });
});

module.exports = router;