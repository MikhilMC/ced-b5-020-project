var express = require('express');
var BreederData = require('../models/BreederData');

var router = express.Router();

router.post('/', function(req, res) {
  BreederData.findOne({ userId: req.body.userId }, (err1, user1) => {
    if (err1) {
      console.log(err1);
      res.status(401).send(err1);
    } else {
      if (user1) {
        console.log("User Id is already used by another user");
        res.send({ msg: "User Id is already used by another user" });
      } else {
        BreederData.findOne({ email: req.body.email }, (err2, user2) => {
          if (err2) {
            console.log(err2);
            res.status(401).send(err2);
          } else {
            if (user2) {
              console.log("Email is already used by another user");
              res.send({ msg: "Email is already used by another user" });
            } else {
              let userData = req.body;
              userData['hasAddedToBlockchain'] = false;
              let user = new BreederData(userData);
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