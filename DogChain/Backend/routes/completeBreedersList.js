const express = require('express');
var verifyToken = require('../authorize')

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    // Smart contract method to get the ids of all the breeders
    MyContract.methods.getAllBreeders()
    .call({from: accounts[0]})
    .then(allBreederIds => {
      console.log(allBreederIds);
      if (allBreederIds.length === 0) {
        // Case : There is no breeder account's data present in the system
        console.log('Complete breeders list is empty.');
        res.send({emptyArrayMsg: 'Complete breeders list is empty.'});
      } else {
        // Case : There are breeder account's data present in the system

        // Smart contract method to get all the details of the given breeders
        MyContract.methods.getBreedersList(allBreederIds)
        .call({from: accounts[0]})
        .then(allBreeders => {
          let allBreedersData = [];
          for (let i = 0; i < allBreederIds.length; i++) {
            let breeder = {}
            breeder['breederId'] = allBreederIds[i];
            breeder['breederName'] = web3.utils.hexToAscii(allBreeders[i].breederName).replace(/\u0000/gi, '');
            allBreedersData.push(breeder);
          }
          console.log(allBreedersData);
          res.status(200).send(allBreedersData);
        })
        .catch(error2 => {
          console.log(error2);
          res.status(401).send(error2);
        })
      }
    })
    .catch(error1 => {
      console.log(error1);
      res.status(401).send(error1);
    });
  })
});

module.exports = router