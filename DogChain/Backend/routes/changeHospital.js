const express = require('express');
var verifyToken = require('../authorize')

const router = express.Router();

router.post('/', verifyToken, (req, res) => {
  let hospitalData = req.body;
  console.log(hospitalData);
  web3.eth.getAccounts()
  .then(accounts => {
    // Smart contract method to find whether the details 
    // of the doctor with the given id is saved in the blockchain or not
    MyContract.methods.isDoctorPresent(hospitalData.doctorId)
    .call({from: accounts[0]})
    .then(result => {
      if (!result) {
        // CASE : Doctor data is absent in the blockchain
        console.log('Doctor with this ID is not registered. Please check the doctor ID.');
        res.send({doctorErrorMsg: 'Doctor with this ID is not registered. Please check the doctor ID.'});
      } else {
        // CASE : Doctor data is present in the blockchain

        // Smart contract method to get the current working hospital of this doctor
        MyContract.methods.getCurrentWorkingHospital(hospitalData.doctorId)
        .call({from: accounts[0]})
        .then(currentHospital => {
          console.log(currentHospital);
          if (web3.utils.hexToAscii(currentHospital).replace(/\u0000/gi, '').toLowerCase() === hospitalData.newHospitalName.toLowerCase()) {
            // CASE : The given new hospital name is similar with the current hospital name
            console.log('This doctor is already working in this hospital. Please check the new hospital name.');
            res.send({sameHospitalErrorMsg: 'This doctor is already working in this hospital. Please check the new hospital name.'});
          } else {
            // CASE : The given new hospital name is different with the current hospital name

            // Smart contract method to change the current working hospital of this doctor
            MyContract.methods.changeHospital(
              hospitalData.doctorId, 
              web3.utils.asciiToHex(hospitalData.newHospitalName)
            )
            .send({from: accounts[0]})
            .then(txn => {
              console.log(txn);
              res.status(200).send(txn);
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