var express = require('express');
const { default: Web3 } = require('web3');
var BreederData = require('../models/BreederData');

var router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  // res.send(req.body.userId);
  BreederData.findOne({userId: req.body.userId}, (error1, user1) => {
    if (error1) {
      console.log(error1);
      res.status(401).send(error1);
    } else {
      console.log(user1);
      // res.status(200).send(user);
      web3.eth.getAccounts().then((accounts)=>{
        MyContract.methods.registerBreeder(user1.userId, web3.utils.fromAscii(user1.name))
        .send({from: accounts[0]})
        .then((txn)=>{
          console.log(txn);
          BreederData.findOneAndUpdate({userId:user1.userId}, {hasAddedToBlockchain: true}, null, (error2, user2)=>{
            if (error2) {
              console.log(error2);
              res.status(401).send(error2);
            } else {
              console.log(user2);
              res.status(200).send({txn, user: user2});
            }
          });
        });
      });
    }
  });
});

module.exports = router;