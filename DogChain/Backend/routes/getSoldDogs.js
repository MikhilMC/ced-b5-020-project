var express = require('express');

var router = express.Router();

router.get('/:breederId', (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    MyContract.methods.getSoldDogIds(req.params.breederId)
    .call({from: accounts[0]})
    .then(soldDogIds => {
      console.log(soldDogIds);
      // res.status(200).send(soldDogs);
      MyContract.methods.getDogsList(soldDogIds)
      .call({from: accounts[0]})
      .then(soldDogs => {
        // console.log(soldDogs);
        // res.status(200).send(soldDogs)
        let soldDogDetails = []
        for (const dog in soldDogs) {
          let dogData = {}
          dogData['dogName'] = web3.utils.hexToAscii(soldDogs[dog].dogName).replace(/\u0000/gi, '');
          dogData['breed'] = web3.utils.hexToAscii(soldDogs[dog].breed).replace(/\u0000/gi, '');
          dogData['colour'] = web3.utils.hexToAscii(soldDogs[dog].colour).replace(/\u0000/gi, '');
          if (soldDogs[dog].sex === 0) {
            dogData['sex'] = 'dog'
          } else {
            dogData['sex'] = 'bitch'
          }
          // dogData['dob'] = web3.utils.hexToAscii(soldDogs[dog].dateOfBirth).replace(/\u0000/gi, '');
          // dogData['fatherId'] = soldDogs[dog].fatherId;
          // dogData['fatherName'] = web3.utils.hexToAscii(soldDogs[dog].fatherName).replace(/\u0000/gi, '');
          // dogData['motherId'] = soldDogs[dog].motherId;
          // dogData['motherName'] = web3.utils.hexToAscii(soldDogs[dog].motherName).replace(/\u0000/gi, '');
          // dogData['breederId'] = soldDogs[dog].breederId;
          // dogData['ownerId'] = soldDogs[dog].ownerIds[soldDogs[dog].currentOwner];
          soldDogDetails.push(dogData);
        }
        console.log(soldDogDetails);
        res.status(200).send({soldDogIds, soldDogDetails});        
      })
      .catch(error2 => {
        console.log(error2);
        res.status(401).send(error2);
      });      
    })
    .catch(error => {
      console.log(error);
      res.status(401).send(error);
    });
  });
});

module.exports = router;