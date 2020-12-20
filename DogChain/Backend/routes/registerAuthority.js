var express = require('express');
const { default: Web3 } = require('web3');
var AuthorityData = require('../models/AuthorityData');

var router = express.Router();

router.post('/', function(req, res) {
  // data = req.body;
  // console.log(data);
  AuthorityData.findOne({ userId: req.body.userId }, (err1, user1) => {
    if (err1) {
      console.log(err1);
      res.status(401).send(err1);
    } else {
      if (user1) {
        console.log("User Id is already used by another user");
        res.send({ msg: "User Id is already used by another user" });
      } else {
        AuthorityData.findOne({ email: req.body.email }, (err2, user2) => {
          if (err2) {
            console.log(err2);
            res.status(401).send(err2);
          } else {
            if (user2) {
              console.log("Email is already used by another user");
              res.send({ msg: "Email is already used by another user" });
            } else {
              let userData = req.body;
              let user = new AuthorityData(userData);
              user.save((err3, signedupUser) => {
                if (err3) {
                  console.log(err3);
                  res.status(401).send(err3);
                } else {
                  console.log(signedupUser);
                  // res.status(200).send({signedupUser});
                  web3.eth.getAccounts()
                  .then((accounts) => {
                    MyContract.methods.registerAuthority(signedupUser.userId, web3.utils.fromAscii(signedupUser.name))
                    .send({ from: accounts[0]})
                    .then((txn) => {
                      console.log(txn);
                      res.send(txn);
                    });
                  });
                }
              });
            }
          }
        });
      }
    }
  });
});

module.exports = router;
