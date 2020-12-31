var express = require('express');
var verifyToken = require('../authorize');

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  vaccData = req.body;
  console.log(vaccData);
  web3.eth.getAccounts()
  .then(accounts => {
    MyContract.methods.isVaccineDataPresent(vaccData.vaccId)
    .call({from: accounts[0]})
    .then(result1 => {
      if (result1) {
        console.log('Vaccine data is already present');
        res.send({msg: 'Vaccine data is already present'});
      } else {
        // res.status(200).send(result1);
        MyContract.methods.isDogPresent(vaccData.dogId)
        .call({from: accounts[0]})
        .then(result2 => {
          if (!result2) {
            console.log('Dog with this ID is not registered. Please check the dog ID.');
            res.send({msg: 'Dog with this ID is not registered. Please check the dog ID.'});
          } else {
            // res.status(200).send(result2);
            MyContract.methods.isDoctorPresent(vaccData.doctorId)
            .call({from: accounts[0]})
            .then(result3 => {
              // res.status(200).send(result3);
              if (!result3) {
                console.log('Doctor with this ID is not registered. Please check the doctor ID.');
                res.send({msg: 'Doctor with this ID is not registered. Please check the doctor ID.'});
              } else {
                // res.status(200).send(result3);
                MyContract.methods.getDogData(vaccData.dogId)
                .call({from: accounts[0]})
                .then(dog => {
                  let dob = web3.utils.hexToAscii(dog.dateOfBirth).replace(/\u0000/gi, '');
                  let t1 = new Date(vaccData.vaccDate);
                  let t2 = new Date(dob);
                  let ageInYears = t1.getFullYear() - t2.getFullYear();
                  let ageInMonths = t1.getMonth() - t2.getMonth();
                  if (ageInMonths < 0) {
                    ageInYears--;
                    ageInMonths = 12 + t1.getMonth() - t2.getMonth();
                  }
                  MyContract.methods.vaccinateDog(vaccData.vaccId, vaccData.dogId, web3.utils.asciiToHex(vaccData.vaccDate), ageInYears, ageInMonths, vaccData.doctorId, web3.utils.asciiToHex(vaccData.vaccName))
                  .send({from: accounts[0]})
                  .then(txn => {
                    console.log(txn);
                    res.status(200).send(txn);
                  })
                  .catch(error5 => {
                    console.log(error5);
                    res.status(401).send(error5);
                  })
                })
                .catch(error4 => {
                  console.log(error4);
                  res.status(401).send(error4)
                });
              }
            })
            .catch(error3 => {
              console.log(error3);
              res.status(401).send(error3)
            });
          }
        })
        .catch(error2 => {
          console.log(error2);
          res.status(401).send(error2)
        })
      }
    })
    .catch(error1 => {
      console.log(error1);
      res.status(401).send(error1)
    })
  });
});

module.exports = router;