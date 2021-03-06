var express = require('express');
var BreederData = require('../models/BreederData');
var verifyToken = require('../authorize')

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  console.log(req.body);
  // Database method to find the breeder with the given id
  BreederData.findOne({breederId: req.body.breederId}, (error1, user1) => {
    if (error1) {
      console.log(error1);
      res.status(401).send(error1);
    } else {
      console.log(user1);
      web3.eth.getAccounts().then((accounts)=>{
        // Smart contract method to save the details of the given breeder account to blockchain
        MyContract.methods.registerBreeder(
          user1.breederId, 
          web3.utils.asciiToHex(user1.name)
        )
        .send({from: accounts[0]})
        .then((txn)=>{
          console.log(txn);
          // Database method to find and update value of the field hasAddedToBlockchain to true
          // indicating that the details of this breeder account have been saved to blockchain.
          BreederData.findOneAndUpdate({breederId: user1.breederId}, {hasAddedToBlockchain: true}, null, (error2, user2)=>{
            if (error2) {
              console.log(error2);
              res.status(401).send(error2);
            } else {
              console.log(user2);
              res.status(200).send({txn, breeder: user2});
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(401).send(err)
        });
      });
    }
  });
});

module.exports = router;