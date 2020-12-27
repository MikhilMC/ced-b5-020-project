var express = require('express');
var DoctorData = require('../models/DoctorData');

var router = express.Router();

router.post('/', (req, res) => {
  // console.log(req.body.userId);
  DoctorData.findOne({doctorId: req.body.doctorId}, (error1, user1) => {
    if (error1) {
      console.log(error1);
      res.status(401).send(error1);
    } else {
      console.log(user1);
      // res.status(200).send(user1);
      web3.eth.getAccounts()
      .then((accounts)=>{
        MyContract.methods.registerDoctor(user1.doctorId, web3.utils.fromAscii(user1.name), web3.utils.fromAscii(user1.hospital))
        .send({from: accounts[0]})
        .then((txn) => {
          console.log(txn);
          DoctorData.findOneAndUpdate({doctorId:req.body.doctorId}, {hasAddedToBlockchain: true}, null, (error2, user2) => {
            if (error2) {
              console.log(error2);
              res.status(401).send(error2);
            } else {
              console.log(user2);
              res.status(200).send({txn, doctor: user2});
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