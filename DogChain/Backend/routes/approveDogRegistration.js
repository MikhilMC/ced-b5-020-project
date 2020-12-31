var express = require('express');
var DogBirthRegisterData = require('../models/DogBirthRegisterData');
var verifyToken = require('../authorize')

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  // console.log(req.body.dogId);
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
        // console.log(dog1.dogId, dog1.dogName, dog1.breed, dog1.colour, dog.sex, dog1.dob, dog1.fatherId, dog1.motherId, dog1.breederId)
        // console.log(dog1.dogId, web3.utils.fromAscii(dog1.dogName), web3.utils.fromAscii(dog1.breed), web3.utils.fromAscii(dog1.colour), dogSex, web3.utils.fromAscii(dog1.dob), dog1.fatherId, dog1.motherId, dog1.breederId)
        MyContract.methods.dogBirthRegistration(dog1.dogId, web3.utils.fromAscii(dog1.dogName), web3.utils.fromAscii(dog1.breed), web3.utils.fromAscii(dog1.colour), dogSex, web3.utils.fromAscii(dog1.dob), dog1.fatherId, dog1.motherId, dog1.breederId)
        .send({from: accounts[0]})
        .then(txn => {
          console.log(txn);
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