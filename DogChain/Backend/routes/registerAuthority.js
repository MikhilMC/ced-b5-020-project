var express = require('express');
var AuthorityData = require('../models/AuthorityData');

var router = express.Router();

router.post('/', function(req, res) {
  AuthorityData.findOne({ authorityId: req.body.userId }, (err1, user1) => {
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
              // let userData = req.body;
              let userData = {};
              userData['authorityId'] = req.body.userId;
              userData['name'] = req.body.name;
              userData['email'] = req.body.email;
              userData['password'] = req.body.password;
              console.log(userData);
              let user = new AuthorityData(userData);
              user.save((err3, signedupUser) => {
                if (err3) {
                  console.log(err3);
                  res.status(401).send(err3);
                } else {
                  console.log(signedupUser);
                  // res.status(200).send({signedupUser});
                  web3.eth.getAccounts()
                  .then(accounts => {
                    MyContract.methods.registerAuthority(signedupUser.authorityId, web3.utils.fromAscii(signedupUser.name))
                    .send({ from: accounts[0]})
                    .then((txn) => {
                      console.log(txn);
                      res.status(200).send({txn, authorityUser: signedupUser});
                    })
                    .catch(error => {
                      console.log(error);
                      res.status(401).send(error);
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
