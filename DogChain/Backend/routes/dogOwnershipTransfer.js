var express = require('express');
var DogData = require('../models/DogBirthRegisterData');
var BreederData = require('../models/BreederData');
var DogOwnershipTransferData = require('../models/DogOwnershipTransferData');
var verifyToken = require('../authorize');

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  transferData = req.body;
  console.log(transferData);
  BreederData.findOne({breederId: transferData.currentOwnerId, hasAddedToBlockchain: true}, (error1, user1) => {
    if (error1) {
      console.log(error1);
      res.status(401).send(error1);
    } else {
      if (!user1) {
        console.log('Current owner is not registered in the system.');
        res.send({msg: 'Current owner is not registered in the system.'});
      } else {
        DogData.findOne({dogId: transferData.dogId, hasAddedToBlockchain: true}, (error2, dog1)=>{
          if (error2) {
            console.log(error2);
            res.status(401).send(error2);
          } else {
            if (!dog1) {
              console.log('This dog is not registered in the system.');
              res.send({msg: 'This dog is not registered in the system.'});
            } else {
              web3.eth.getAccounts()
              .then(accounts => {
                MyContract.methods.getDogCurrentOwner(transferData.dogId)
                .call({from: accounts[0]})
                .then(currentOwnerId => {
                  console.log(currentOwnerId);
                  if (currentOwnerId == transferData.currentOwnerId) {
                    BreederData.findOne({breederId: transferData.newOwnerId, hasAddedToBlockchain: true}, (error4, user2) => {
                      if (error4) {
                        console.log(error4);
                        res.status(401).send(error4);
                      } else {
                        console.log(user2);
                        if (!user2) {
                          console.log('New owner is not registered in the system.');
                          res.send({msg: 'New owner is not registered in the system.'});
                        } else {
                          transferData['hasAddedToBlockchain'] = false;
                          let ownershipTransfer = new DogOwnershipTransferData(transferData);
                          ownershipTransfer.save((error5, transfer) => {
                            if (error5) {
                              console.log(error5);
                              res.status(401).send(error5);
                            } else {
                              console.log(transfer);
                              res.status(200).send(transfer);
                            }
                          });
                        }
                      }
                    });
                  } else {
                    console.log('This owner do not have permission to transfer ownership.');
                    res.send({msg: 'This owner do not have permission to transfer ownership.'});
                  }
                })
                .catch(error3 => {
                  console.log(error3);
                  res.status(401).send(error3);
                })
              });
            }
          }
        });
      }
    }
  });
});

module.exports = router;