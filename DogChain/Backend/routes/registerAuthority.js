var express = require('express');
var jwt = require('jsonwebtoken');
var AuthorityData = require('../models/AuthorityData');

var router = express.Router();

router.post('/', function(req, res) {
  // Database method to find the authority account with the given id is already being used.
  AuthorityData.findOne({ authorityId: req.body.userId }, (err1, user1) => {
    if (err1) {
      console.log(err1);
      res.status(401).send(err1);
    } else {
      if (user1) {
        // Case : The given user id is already being used.
        console.log("User Id is already used by another user");
        res.send({ msg: "User Id is already used by another user" });
      } else {
        // Case : The given user id is not being used.

        // Database method to find the authority account 
        // with the given email is already being used.
        AuthorityData.findOne({ email: req.body.email }, (err2, user2) => {
          if (err2) {
            console.log(err2);
            res.status(401).send(err2);
          } else {
            if (user2) {
              // Case : The given email is already being used.
              console.log("Email is already used by another user");
              res.send({ msg: "Email is already used by another user" });
            } else {
              // Case : The given email is not being used.
              let userData = {};
              userData['authorityId'] = req.body.userId;
              userData['name'] = req.body.name;
              userData['email'] = req.body.email;
              userData['password'] = req.body.password;
              console.log(userData);
              let user = new AuthorityData(userData);
              // Database method to save the authority data into the database
              user.save((err3, signedupUser) => {
                if (err3) {
                  console.log(err3);
                  res.status(401).send(err3);
                } else {
                  console.log(signedupUser);
                  web3.eth.getAccounts()
                  .then(accounts => {
                    // Smart contract method for saving the 
                    // authority account details to the blockchain.
                    MyContract.methods.registerAuthority(
                      signedupUser.authorityId, 
                      web3.utils.fromAscii(signedupUser.name)
                    )
                    .send({ from: accounts[0]})
                    .then(txn => {
                      console.log(txn);
                      let payload = {subject: user._id}
                      console.log(payload);
                      let token = jwt.sign(payload, 'secretKey');   // Signing json web token.
                      res.status(200).send({token, signedupUser});
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
