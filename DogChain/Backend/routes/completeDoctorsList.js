const express = require('express');
var verifyToken = require('../authorize')

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    // Smart contract method to get the ids of all the doctors
    MyContract.methods.getAllDoctors()
    .call({from: accounts[0]})
    .then(allDoctorIds => {
      console.log(allDoctorIds);
      if (allDoctorIds.length === 0) {
        // CASE : There is no doctor account's data present in the system
        console.log('Complete doctors list is empty.');
        res.send({emptyArrayMsg: 'Complete doctors list is empty.'});
      } else {
        // CASE : There are doctor account's data present in the system
        
        // Smart contract method to get all the details of the given doctors
        MyContract.methods.getDoctorsList(allDoctorIds)
        .call({from: accounts[0]})
        .then(allDoctors => {
          let allDoctorsData = [];
          for (let i = 0; i < allDoctorIds.length; i++) {
            let doctor = {}
            doctor['doctorId'] = allDoctorIds[i];
            doctor['doctorName'] = web3.utils.hexToAscii(allDoctors[i].doctorName).replace(/\u0000/gi, '');
            doctor['currentHospital'] = web3.utils.hexToAscii(allDoctors[i].hospitalNames[allDoctors[i].currentHospital]).replace(/\u0000/gi, '');
            allDoctorsData.push(doctor);
          }
          console.log(allDoctorsData);
          res.status(200).send(allDoctorsData);
        })
        .catch(error2 => {
          console.log(error2);
          res.status(401).send(error2)
        });
      }
    })
    .catch(error1 => {
      console.log(error1);
      res.status(401).send(error1)
    })
  });
});

module.exports = router