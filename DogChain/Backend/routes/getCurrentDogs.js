var express = require('express');

var router = express.Router();

router.get('/:breederId', (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    MyContract.methods.getCurrentDogIds(req.params.breederId)
    .call({from: accounts[0]})
    .then(currentDogIds => {
      console.log(currentDogIds);
      // res.status(401).send(currentDogIds);
      MyContract.methods.getDogsList(currentDogIds)
      .call({from: accounts[0]})
      .then(currentDogs => {
        // console.log(currentDogs);
        // res.status(200).send(currentDogs);
        let currentDogDetails = []
        for (const dog in currentDogs) {
          let dogData = {}
          dogData['dogName'] = web3.utils.hexToAscii(currentDogs[dog].dogName).replace(/\u0000/gi, '');
          dogData['breed'] = web3.utils.hexToAscii(currentDogs[dog].breed).replace(/\u0000/gi, '');
          dogData['colour'] = web3.utils.hexToAscii(currentDogs[dog].colour).replace(/\u0000/gi, '');
          if (currentDogs[dog].sex === 0) {
            dogData['sex'] = 'dog'
          } else {
            dogData['sex'] = 'bitch'
          }
          // dogData['dob'] = web3.utils.hexToAscii(currentDogs[dog].dateOfBirth).replace(/\u0000/gi, '');
          // dogData['fatherId'] = currentDogs[dog].fatherId;
          // dogData['fatherName'] = web3.utils.hexToAscii(currentDogs[dog].fatherName).replace(/\u0000/gi, '');
          // dogData['motherId'] = currentDogs[dog].motherId;
          // dogData['motherName'] = web3.utils.hexToAscii(currentDogs[dog].motherName).replace(/\u0000/gi, '');
          // dogData['breederId'] = currentDogs[dog].breederId;
          // dogData['ownerId'] = currentDogs[dog].ownerIds[currentDogs[dog].currentOwner];
          currentDogDetails.push(dogData);
        }
        console.log(currentDogDetails);
        res.status(200).send({currentDogIds, currentDogDetails});        
      })
      .catch(error2 => {
        console.log(error2);
        res.status(401).send(error2);
      });      
    })
    .catch(error1 => {
      console.log(error1);
      res.status(401).send(error1);
    });
  });
});

module.exports = router;