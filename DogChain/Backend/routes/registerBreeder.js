var express = require('express');

var BreederData = require('../models/BreederData');

var router = express.Router();

router.post('/', function(req, res) {
  // Database method to find the breeder account with the given id is already used.
  BreederData.findOne({ breederId: req.body.userId }, (err1, user1) => {
    if (err1) {
      console.log(err1);
      res.status(401).send(err1);
    } else {
      if (user1) {
        // CASE : The given user id is already being used.
        console.log("User Id is already used by another user");
        res.send({ msg: "User Id is already used by another user" });
      } else {
        // CASE : The given user id is not being used.
        
        // Database method to find the breeder account with the given email is already used.
        BreederData.findOne({ email: req.body.email }, (err2, user2) => {
          if (err2) {
            console.log(err2);
            res.status(401).send(err2);
          } else {
            if (user2) {
              // CASE : The given email is already being used.
              console.log("Email is already used by another user");
              res.send({ msg: "Email is already used by another user" });
            } else {
              // CASE : The given email is not being used.
              let userData = {};
              userData['breederId'] = req.body.userId;
              userData['name'] = req.body.name;
              userData['email'] = req.body.email;
              userData['password'] = req.body.password;
              
              // The following field of a breeder account is set to false,
              // because the breeder account details have not saved to blockchain yet.
              userData['hasAddedToBlockchain'] = false;
              
              console.log(userData);
              let user = new BreederData(userData);
              // Database method to save the breeder data into the database
              user.save((err3, signedupUser) => {
                if (err3) {
                  console.log(err3);
                  res.status(401).send(err3);
                } else {
                  console.log(signedupUser);
                  res.status(200).send(signedupUser);
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