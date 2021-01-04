const express = require('express');
var verifyToken = require('../authorize')

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    // Smart contract method to get the ids of all the dogs
    MyContract.methods.getAllDogs()
    .call({from: accounts[0]})
    .then(allDogsIds => {
      console.log(allDogsIds)
      if (allDogsIds.length === 0) {
        // CASE : There is no dog's data present in the system
        console.log('Complete dogs list is empty.');
        res.send({emptyArrayMsg: 'Complete dogs list is empty.'});
      } else {
        // CASE : There are dog's data present in the system

        // Smart contract method to get all the details of the given dogs
        MyContract.methods.getDogsList(allDogsIds)
        .call({from: accounts[0]})
        .then(allDogs => {
          console.log(allDogs);
          let allDogsData = [];
          for (let i = 0; i < allDogsIds.length; i++) {
            let dog = {};
            dog['dogId'] = allDogsIds[i];
            dog['dogName'] = web3.utils.hexToAscii(allDogs[i].dogName).replace(/\u0000/gi, '');
            dog['breed'] = web3.utils.hexToAscii(allDogs[i].breed).replace(/\u0000/gi, '');
            dog['colour'] = web3.utils.hexToAscii(allDogs[i].colour).replace(/\u0000/gi, '');
            if (allDogs[i].sex == 0) {
              dog['sex'] = 'dog';
            } else {
              dog['sex'] = 'bitch';
            }
            dog['breederId'] = allDogs[i].breederId;
            dog['currentOwnerId'] = allDogs[i].ownerIds[allDogs[i].currentOwner];
            allDogsData.push(dog);
          }
          console.log(allDogsData);
          res.status(200).send(allDogsData);
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
    })
  });
});

module.exports = router