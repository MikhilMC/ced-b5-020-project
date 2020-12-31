const express = require('express');
var verifyToken = require('../authorize');

const router = express.Router();

router.get('/:dogId', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    MyContract.methods.isDogPresent(req.params.dogId)
    .call({from: accounts[0]})
    .then(result => {
      if (!result) {
        console.log('Dog is not registered. Please check the dog ID.');
        res.send({msg: 'Dog is not registered. Please check the dog ID.'});
      } else {
        MyContract.methods.getDogTreatments(req.params.dogId)
        .call({from: accounts[0]})
        .then(dogTreatmentIds => {
          console.log(dogTreatmentIds);
          if (dogTreatmentIds.length === 0) {
            console.log('Dog treatment list is empty.');
            res.send({emptyArrayMsg: 'Dog treatment list is empty.'});
          } else {
            MyContract.methods.getTreatmentList(dogTreatmentIds)
            .call({from: accounts[0]})
            .then(dogTreatmentList => {
              // console.log(dogTreatmentList);
              // res.status(200).send(dogTreatmentList);
              let dogTreatmentData = [];
              for (let i = 0; i < dogTreatmentIds.length; i++) {
                let treatment = {};
                treatment['treatId'] = dogTreatmentIds[i];
                treatment['dogId'] = dogTreatmentList[i].dogId;
                treatment['ownerId'] = dogTreatmentList[i].ownerId;
                treatment['admissionDate'] = web3.utils.hexToAscii(dogTreatmentList[i].admissionDate).replace(/\u0000/gi, '');
                treatment['doctorId'] = dogTreatmentList[i].doctorId
                dogTreatmentData.push(treatment);
              }
              console.log(dogTreatmentData);
              res.status(200).send(dogTreatmentData);
            })
            .catch(error3 => {
              console.log(error3);
              res.status(401).send(error3);
            });
          }
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