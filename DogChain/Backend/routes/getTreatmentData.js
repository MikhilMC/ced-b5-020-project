const express = require('express');
var verifyToken = require('../authorize');

const router = express.Router();

router.get('/:treatId', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    // Smart contract method to find whether the treatment data 
    // with the given id is present or not
    MyContract.methods.isTreatmentDataPresent(req.params.treatId)
    .call({from: accounts[0]})
    .then(result => {
      console.log(result);
      if (!result) {
        // Case : Treatment data is absent
        console.log('Treatment data is absent');
        res.send({msg: 'Treatment data is absent'});
      } else {
        // Case : Treatment data is present

        // Smart contract method retreive the treatment data of the given id
        MyContract.methods.getDogTreatmentData(req.params.treatId)
        .call({from: accounts[0]})
        .then(treatment => {
          let treatmentData = {}
          treatmentData['treatmentId'] = req.params.treatId;
          treatmentData['dogId'] = treatment.dogId;
          treatmentData['ownerId'] = treatment.ownerId;
          treatmentData['admissionDate'] = web3.utils.hexToAscii(treatment.admissionDate).replace(/\u0000/gi, '');
          treatmentData['dogAgeYears'] = treatment.dogAgeYears;
          treatmentData['dogAgeMonths'] = treatment.dogAgeMonths;
          treatmentData['doctorId'] = treatment.doctorId;
          treatmentData['hospitalName'] = web3.utils.hexToAscii(treatment.hospitalName).replace(/\u0000/gi, '');
          let symptoms = [];
          treatment.symptoms.forEach(element => {
            symptoms.push(web3.utils.hexToAscii(element).replace(/\u0000/gi, ''));
          });
          treatmentData['symptoms'] = symptoms;
          treatmentData['verdict'] = web3.utils.hexToAscii(treatment.verdict).replace(/\u0000/gi, '');
          let prescription = [];
          treatment.medicinesPrescribed.forEach(element => {
            prescription.push(web3.utils.hexToAscii(element).replace(/\u0000/gi, ''));
          });
          treatmentData['prescription'] = prescription;
          console.log(treatmentData);
          res.status(200).send(treatmentData);
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
    });
  })
});

module.exports = router;