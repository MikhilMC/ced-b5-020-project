const express = require('express');
const BreederData = require('../models/BreederData');
var verifyToken = require('../authorize');

const router = express.Router();

router.get('/:breederId', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    // Smart contract to find whether details of the breeder is saved to blockchain or not
    MyContract.methods.isBreederPresent(req.params.breederId)
    .call({from: accounts[0]})
    .then(result => {
      if (!result) {
        // Case : The data of the breeder is not present
        console.log('Breeder with this ID is not registered. Please check the breeder ID.');
        res.send({msg: 'Breeder with this ID is not registered. Please check the breeder ID.'});
      } else {
        // Case : The data of the breeder is present

        // Smart contract method for retreiving all the details of the given breeder id.
        MyContract.methods.getBreederData(req.params.breederId)
        .call({from: accounts[0]})
        .then(breeder => {
          let breederData = {}
          breederData['breederId'] = req.params.breederId;
          breederData['breederName'] = web3.utils.hexToAscii(breeder.breederName).replace(/\u0000/gi, '');
          breederData['dogIds'] = breeder.dogIds;
          res.status(200).send(breederData);
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
    })
  });
});

module.exports = router;