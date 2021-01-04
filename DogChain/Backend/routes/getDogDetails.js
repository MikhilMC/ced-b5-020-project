var express = require('express');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/:dogId', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    // Smart contract method to find whether the details 
    // of the dog with given id is saved in the blockchain or not
    MyContract.methods.isDogPresent(req.params.dogId)
    .call({from: accounts[0]})
    .then(result => {
      if (!result) {
        // CASE : The details of the dog with the given id is not saved in the blockchain
        console.log('Dog with this ID is not registered. Please check the dog ID.');
        res.send({msg: 'Dog with this ID is not registered. Please check the dog ID.'});
      } else {
        // CASE : The details of the dog with the given id is available in the blockchain

        // Smart contract method to retreive the details of the dog with the given id
        MyContract.methods.getDogData(req.params.dogId)
        .call({from: accounts[0]})
        .then(dog => {
          console.log(dog);
          let dogData = {}
          dogData['dogName'] = web3.utils.hexToAscii(dog.dogName).replace(/\u0000/gi, '');
          dogData['breed'] = web3.utils.hexToAscii(dog.breed).replace(/\u0000/gi, '');
          dogData['colour'] = web3.utils.hexToAscii(dog.colour).replace(/\u0000/gi, '');
          if (dog.sex === 0) {
            dogData['sex'] = 'dog'
          } else {
            dogData['sex'] = 'bitch'
          }
          dogData['dob'] = web3.utils.hexToAscii(dog.dateOfBirth).replace(/\u0000/gi, '');
          let t1 = new Date(Date.now());
          let t2 = new Date(dogData.dob);
          let ageInYears = t1.getFullYear() - t2.getFullYear();
          let ageInMonths = t1.getMonth() - t2.getMonth();
          if (ageInMonths < 0) {
            ageInYears--;
            ageInMonths = 12 + t1.getMonth() - t2.getMonth();
          }
          dogData['ageInYears'] = ageInYears;
          dogData['ageInMonths'] = ageInMonths;
          dogData['fatherId'] = dog.fatherId;
          dogData['fatherName'] = web3.utils.hexToAscii(dog.fatherName).replace(/\u0000/gi, '');
          dogData['motherId'] = dog.motherId;
          dogData['motherName'] = web3.utils.hexToAscii(dog.motherName).replace(/\u0000/gi, '');
          dogData['breederId'] = dog.breederId;
          dogData['ownerId'] = dog.ownerIds[dog.currentOwner]
          console.log(dogData);
          res.status(200).send(dogData);
        })
        .catch(error2 => {
          console.log(error2);
          res.status(401).send(error2);
        });        
      }
    })
    .catch(error1 => {
      console.log(error1);
      res.status(401).send(error1);
    });
  });
});

module.exports = router;