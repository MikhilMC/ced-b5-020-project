var express = require('express');

var router = express.Router();

router.get('/:dogId', (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    MyContract.methods.getDogData(req.params.dogId)
    .call({from: accounts[0]})
    .then(dog => {
      console.log(dog);
      // res.status(200).send(dog);
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
      ageInYears = t1.getFullYear() - t2.getFullYear();
      ageInMonths = t1.getMonth() - t2.getMonth();
      if (ageInMonths < 0 || ageInMonths === 0) {
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
    .catch(error => {
      console.log(error);
      res.status(401).send(error);
    });
  });
});

module.exports = router;