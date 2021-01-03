var express = require('express');
var DogBirthRegisterData = require('../models/DogBirthRegisterData');
var verifyToken = require('../authorize')

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  // Database method to find the dog birth registration with the given id
  DogBirthRegisterData.findOne({dogId: req.body.dogId}, (error1, dog1) => {
    if (error1) {
      console.log(error1);
      res.status(401).send(error1);
    } else {
      web3.eth.getAccounts()
      .then(accounts => {
        if (dog1.sex === 'dog') {
          dogSex = 0;
        } else {
          dogSex = 1;
        }
        // Smart contract method to save the details 
        // of the given dog birth registration to blockchain
        MyContract.methods.dogBirthRegistration(
          dog1.dogId, 
          web3.utils.asciiToHex(dog1.dogName), 
          web3.utils.asciiToHex(dog1.breed), 
          web3.utils.asciiToHex(dog1.colour), 
          dogSex, 
          web3.utils.asciiToHex(dog1.dob), 
          dog1.fatherId, 
          dog1.motherId, 
          dog1.breederId
        )
        .send({from: accounts[0]})
        .then(txn => {
          console.log(txn);
          // Database method to find and update value of the field hasAddedToBlockchain to true
          // indicating that the details of this dog birth registration have been saved to blockchain.
          DogBirthRegisterData.findOneAndUpdate({dogId: dog1.dogId}, {hasAddedToBlockchain: true}, null, (error2, dog2)=>{
            if (error2) {
              console.log(error2);
              res.status(401).send(error2);
            } else {
              console.log(dog2);
              res.status(200).send({txn, dog: dog2});
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(401).send(err)
        });
      });
    }
  });
});

module.exports = router;