var express = require('express');
var DogData = require('../models/DogBirthRegisterData');
var BreederData = require('../models/BreederData');
var DogOwnershipTransferData = require('../models/DogOwnershipTransferData');
var verifyToken = require('../authorize');

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  transferData = req.body;
  console.log(transferData);
  // Database method to find whether the details of the current owner is saved in the blockchain.
  BreederData.findOne({breederId: transferData.currentOwnerId, hasAddedToBlockchain: true}, (error1, user1) => {
    if (error1) {
      console.log(error1);
      res.status(401).send(error1);
    } else {
      if (!user1) {
        // Case : Current owner is not registered in the system
        //        and his/her details is not stored in the blockchain
        console.log('Current owner is not registered in the system.');
        res.send({breederErrorMsg: 'Current owner is not registered in the system.'});
      } else {
        // Case : Current owner is registered in the system
        //        and his/her details is stored in the blockchain

        // Database method to find whether the details of the dog is saved in the blockchain.
        DogData.findOne({dogId: transferData.dogId, hasAddedToBlockchain: true}, (error2, dog1)=>{
          if (error2) {
            console.log(error2);
            res.status(401).send(error2);
          } else {
            if (!dog1) {
              // Case : The dog's birth registration is not approved by the authority
              //        and it's details is not stored in the blockchain
              console.log('This dog is not registered in the system.');
              res.send({msg: 'This dog is not registered in the system.'});
            } else {
              // Case : The dog's birth registration is approved by the authority
              //        and it's details is stored in the blockchain
              web3.eth.getAccounts()
              .then(accounts => {
                // Smart contract method to get the current owner of this dog
                MyContract.methods.getDogCurrentOwner(transferData.dogId)
                .call({from: accounts[0]})
                .then(currentOwnerId => {
                  console.log(currentOwnerId);
                  if (currentOwnerId == transferData.currentOwnerId) {
                    // Case : The given owner is the current owner of this dog

                    // Database method to find whether the new owner's details 
                    // is approved and stored in the blockchain
                    BreederData.findOne({breederId: transferData.newOwnerId, hasAddedToBlockchain: true}, (error4, user2) => {
                      if (error4) {
                        console.log(error4);
                        res.status(401).send(error4);
                      } else {
                        console.log(user2);
                        if (!user2) {
                          // Case : New owner is not registered in the system
                          //        and his/her details is not stored in the blockchain
                          console.log('New owner is not registered in the system.');
                          res.send({msg: 'New owner is not registered in the system.'});
                        } else {
                          // Case : New owner is registered in the system
                          //        and his/her details is stored in the blockchain

                          // The following field of a dog birth register is set to false,
                          // because the dog birth register details have not saved to blockchain yet.
                          transferData['hasAddedToBlockchain'] = false;
                          
                          let ownershipTransfer = new DogOwnershipTransferData(transferData);
                          
                          // Database method for saving the dog ownership 
                          // transfer data into the database
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
                    // Case : The given owner is not the current owner of this dog, and hence 
                    //        do not have permission to sell/transfer ownership of this dog.
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