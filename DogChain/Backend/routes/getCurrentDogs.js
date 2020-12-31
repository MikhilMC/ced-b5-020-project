var express = require('express');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/:breederId', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    MyContract.methods.isBreederPresent(req.params.breederId)
    .call({from: accounts[0]})
    .then(result => {
      if (!result) {
        console.log('Breeder with this ID is not registered. Please check the breeder ID.');
        res.send({msg: 'Breeder with this ID is not registered. Please check the breeder ID.'});
      } else {
        MyContract.methods.getCurrentDogIds(req.params.breederId)
        .call({from: accounts[0]})
        .then(currentDogIds => {
          console.log(currentDogIds);
          // res.status(401).send(currentDogIds);
          if (currentDogIds.length === 0) {
            console.log('Current dog list is empty.');
            res.send({emptyArrayMsg: 'Current dog list is empty.'});
          } else {
            MyContract.methods.getDogsList(currentDogIds)
            .call({from: accounts[0]})
            .then(currentDogs => {
              let currentDogDetails = []
              for (let i = 0; i < currentDogIds.length; i++) {
                let dogData = {}
                dogData['dogId'] = currentDogIds[i]
                dogData['dogName'] = web3.utils.hexToAscii(currentDogs[i].dogName).replace(/\u0000/gi, '');
                dogData['breed'] = web3.utils.hexToAscii(currentDogs[i].breed).replace(/\u0000/gi, '');
                dogData['colour'] = web3.utils.hexToAscii(currentDogs[i].colour).replace(/\u0000/gi, '');
                if (currentDogs[i].sex === 0) {
                  dogData['sex'] = 'dog'
                } else {
                  dogData['sex'] = 'bitch'
                }
                currentDogDetails.push(dogData);
              }
              console.log(currentDogDetails);
              res.status(200).send({currentDogDetails});
            })
            .catch(error3 => {
              console.log(error3);
              res.status(401).send(error3);
            });
          }
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