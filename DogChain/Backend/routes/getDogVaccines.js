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
        MyContract.methods.getDogVaccines(req.params.dogId)
        .call({from: accounts[0]})
        .then(dogVaccineIds => {
          console.log(dogVaccineIds);
          if (dogVaccineIds.length === 0) {
            console.log('Dog vaccine list is empty.');
            res.send({emptyArrayMsg: 'Dog vaccine list is empty.'});
          } else {
            MyContract.methods.getVaccinesList(dogVaccineIds)
            .call({from: accounts[0]})
            .then(dogVaccinesList => {
              // console.log(dogVaccinesList);
              // res.status(200).send(dogVaccinesList)
              let dogVaccinesData = [];
              for (let i = 0; i < dogVaccineIds.length; i++) {
                let vaccine = {};
                vaccine['vaccId'] = dogVaccineIds[i];
                vaccine['dogId'] = dogVaccinesList[i].dogId;
                vaccine['ownerId'] = dogVaccinesList[i].ownerId;
                vaccine['vaccDate'] = web3.utils.hexToAscii(dogVaccinesList[i].vaccinatedDate).replace(/\u0000/gi, '');
                // vaccine['dogAgeYears'] = dogVaccinesList[i].dogAgeYears;
                // vaccine['dogAgeMonths'] = dogVaccinesList[i].dogAgeMonths;
                vaccine['doctorId'] = dogVaccinesList[i].doctorId;
                // vaccine['hospitalName'] = web3.utils.hexToAscii(dogVaccinesList[i].hospitalName).replace(/\u0000/gi, '');
                // vaccine['vaccineName'] = web3.utils.hexToAscii(dogVaccinesList[i].vaccineName).replace(/\u0000/gi, '');
                dogVaccinesData.push(vaccine);
              }
              console.log(dogVaccinesData);
              res.status(200).send(dogVaccinesData);
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
        });
      }
    })
    .catch(error1 => {
      console.log(error1);
      res.status(401).send(error1);
    });
  });
});

module.exports = router;