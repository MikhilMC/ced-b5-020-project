var express = require('express');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/:breederId', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    // Smart contract to find whether details of the breeder is saved to blockchain or not
    MyContract.methods.isBreederPresent(req.params.breederId)
    .call({from: accounts[0]})
    .then(result => {
      if (!result) {
        // CASE : The data of the breeder is not present
        console.log('Breeder with this ID is not registered. Please check the breeder ID.');
        res.send({breederErrorMsg: 'Breeder with this ID is not registered. Please check the breeder ID.'});
      } else {
        // CASE : The data of the breeder is present
        
        // Smart contract method to find the ids of all the dogs of this owner
        MyContract.methods.getTotalDogIds(req.params.breederId)
        .call({from: accounts[0]})
        .then(totalDogIds => {
          console.log(totalDogIds);
          if (totalDogIds.length === 0) {
            // CASE : The total dog id list is empty
            console.log('Total dogs list is empty.');
            res.send({emptyArrayMsg: 'Total dogs list is empty.'});
          } else {
            // CASE : The total dog id list is not empty

            // Smart contract method to get all the details of the total dogs.
            MyContract.methods.getDogsList(totalDogIds)
            .call({from: accounts[0]})
            .then(totalDogs => {
              let totalDogDetails = []
              for (let i = 0; i < totalDogIds.length; i++) {
                let dogData = {}
                dogData['dogId'] = totalDogIds[i]
                dogData['dogName'] = web3.utils.hexToAscii(totalDogs[i].dogName).replace(/\u0000/gi, '');
                dogData['breed'] = web3.utils.hexToAscii(totalDogs[i].breed).replace(/\u0000/gi, '');
                dogData['colour'] = web3.utils.hexToAscii(totalDogs[i].colour).replace(/\u0000/gi, '');
                if (totalDogs[i].sex === 0) {
                  dogData['sex'] = 'dog'
                } else {
                  dogData['sex'] = 'bitch'
                }
                totalDogDetails.push(dogData);
              }
              console.log(totalDogDetails)
              res.status(200).send({totalDogDetails});
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
    })
  });
});

module.exports = router;