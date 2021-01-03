const express = require('express');
var verifyToken = require('../authorize');

const router = express.Router();

router.get('/:doctorId', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    // Smart contract to find whether details of the doctor is saved to blockchain or not
    MyContract.methods.isDoctorPresent(req.params.doctorId)
    .call({from: accounts[0]})
    .then(result => {
      if (!result) {
        // Case : The data of the doctor is not present
        console.log('doctor with this ID is not registered. Please check the doctor ID.');
        res.send({msg: 'doctor with this ID is not registered. Please check the doctor ID.'});
      } else {
        // Case : The data of the doctor is present

        // Smart contract method for retreiving all the details of the given doctor id.
        MyContract.methods.getDoctorData(req.params.doctorId)
        .call({from: accounts[0]})
        .then(doctor => {
          // res.status(200).send(doctor);
          let doctorData = {}
          doctorData['doctorId'] = req.params.doctorId;
          doctorData['doctorName'] = web3.utils.hexToAscii(doctor.doctorName).replace(/\u0000/gi, '');
          doctorData['hospitalNames'] = doctor.hospitalNames.map(web3.utils.hexToAscii).map(x => x.replace(/\u0000/gi, ''));
          doctorData['currentHospital'] = web3.utils.hexToAscii(doctor.hospitalNames[doctor.currentHospital]).replace(/\u0000/gi, '');
          console.log(doctorData);
          res.status(200).send(doctorData);
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