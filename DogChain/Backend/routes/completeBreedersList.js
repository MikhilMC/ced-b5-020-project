const express = require('express');
var verifyToken = require('../authorize')

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    MyContract.methods.getAllBreeders()
    .call({from: accounts[0]})
    .then(allBreederIds => {
      console.log(allBreederIds);
      // res.status(200).send(allBreederIds);
      if (allBreederIds.length === 0) {
        console.log('Complete breeders list is empty.');
        res.send({emptyArrayMsg: 'Complete breeders list is empty.'});
      } else {
        MyContract.methods.getBreedersList(allBreederIds)
        .call({from: accounts[0]})
        .then(allBreeders => {
          // res.status(200).send(allBreeders);
          let allBreedersData = [];
          for (let i = 0; i < allBreederIds.length; i++) {
            let breeder = {}
            breeder['breederId'] = allBreederIds[i];
            breeder['breederName'] = web3.utils.hexToAscii(allBreeders[i].breederName).replace(/\u0000/gi, '');
            // breeder['dogIds'] = allBreeders[i].dogIds;
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