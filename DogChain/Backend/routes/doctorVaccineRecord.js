var express = require('express');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/:doctorId', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    MyContract.methods.isDoctorPresent(req.params.doctorId)
    .call({from: accounts[0]})
    .then(result => {
      if (!result) {
        console.log('Doctor with this ID is not registered. Please check the doctor ID.');
        res.send({msg: 'Doctor with this ID is not registered. Please check the doctor ID.'});
      } else {
        MyContract.methods.getDoctorVaccinations(req.params.doctorId)
        .call({from: accounts[0]})
        .then(vaccinations => {
          console.log(vaccinations);
          // res.status(200).send(vaccinations);
          if (vaccinations.length === 0) {
            console.log('Doctor vaccine list is empty.');
            res.send({emptyArrayMsg: 'Doctor vaccine list is empty.'});
          } else {
            MyContract.methods.getVaccinesList(vaccinations)
            .call({from: accounts[0]})
            .then(vaccineList => {
              // console.log(vaccineList);
              // res.status(200).send(vaccineList);
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