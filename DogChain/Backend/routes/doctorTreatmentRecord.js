var express = require('express');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/:doctorId', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    // Smart contract method to find whether the doctor account is present or not.
    MyContract.methods.isDoctorPresent(req.params.doctorId)
    .call({from: accounts[0]})
    .then(result => {
      if (!result) {
        // Case : Doctor account is not present
        console.log('Doctor with this ID is not registered. Please check the doctor ID.');
        res.send({doctorErrorMsg: 'Doctor with this ID is not registered. Please check the doctor ID.'});
      } else {
        // Case : Doctor account is present

        // Smart contract method to retreive all the treatment ids done by this doctor
        MyContract.methods.getDoctorTreatments(req.params.doctorId)
        .call({from: accounts[0]})
        .then(treatments => {
          console.log(treatments);
          if (treatments.length === 0) {
            // Case : Doctor's treatment id list is empty
            console.log('Doctor treatment list is empty.');
            res.send({emptyArrayMsg: 'Doctor treatment list is empty.'});
          } else {
            // Case : Doctor's treatment id list is not empty

            // Smart contract method to get all the details of the given treatments
            MyContract.methods.getTreatmentList(treatments)
            .call({from: accounts[0]})
            .then(treatmentList => {
              let totalTreatments = [];
              for(let i = 0; i < treatments.length; i++) {
                let treatmentData = {};
                treatmentData['treatId'] = treatments[i];
                treatmentData['dogId'] = treatmentList[i].dogId;
                treatmentData['ownerId'] = treatmentList[i].ownerId;
                treatmentData['admissionDate'] = web3.utils.hexToAscii(treatmentList[i].admissionDate).replace(/\u0000/gi, '');
                totalTreatments.push(treatmentData);
              }
              console.log(totalTreatments);
              res.status(200).send(totalTreatments);
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
    })
  });
});

module.exports = router;