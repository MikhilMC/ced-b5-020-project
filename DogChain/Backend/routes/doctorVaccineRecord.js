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
        // CASE : Doctor account is not present
        console.log('Doctor with this ID is not registered. Please check the doctor ID.');
        res.send({doctorErrorMsg: 'Doctor with this ID is not registered. Please check the doctor ID.'});
      } else {
        // CASE : Doctor account is present
        
        // Smart contract method to retreive all the vaccination ids done by this doctor
        MyContract.methods.getDoctorVaccinations(req.params.doctorId)
        .call({from: accounts[0]})
        .then(vaccinations => {
          console.log(vaccinations);
          if (vaccinations.length === 0) {
            // CASE : Doctor's vaccination id list is empty
            console.log('Doctor vaccine list is empty.');
            res.send({emptyArrayMsg: 'Doctor vaccine list is empty.'});
          } else {
            // CASE : Doctor's vaccination id list is not empty

            // Smart contract method to get all the details of the given vaccinations
            MyContract.methods.getVaccinesList(vaccinations)
            .call({from: accounts[0]})
            .then(vaccineList => {
              let totalVaccinations = [];
              for(let i = 0; i < vaccinations.length; i++) {
                let vaccineData = {};
                vaccineData['vaccId'] = vaccinations[i];
                vaccineData['dogId'] = vaccineList[i].dogId;
                vaccineData['ownerId'] = vaccineList[i].ownerId;
                vaccineData['vaccDate'] = web3.utils.hexToAscii(vaccineList[i].vaccinatedDate).replace(/\u0000/gi, '');
                totalVaccinations.push(vaccineData);
              }
              console.log(totalVaccinations);
              res.status(200).send(totalVaccinations);
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