const express = require('express');
var verifyToken = require('../authorize');

const router = express.Router();

router.get('/:vaccId', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    MyContract.methods.isVaccineDataPresent(req.params.vaccId)
    .call({from: accounts[0]})
    .then(result => {
      console.log(result);
      // res.status(200).send(result);
      if (!result) {
        console.log('Vaccine data is absent');
        res.send({msg: 'Vaccine data is absent'});
      } else {
        MyContract.methods.getVaccineData(req.params.vaccId)
        .call({from: accounts[0]})
        .then(vaccine => {
          // console.log(vaccine);
          // res.status(200).send(vaccine);
          let vaccineData = {}
          vaccineData['vaccId'] = req.params.vaccId;
          vaccineData['dogId'] = vaccine.dogId;
          vaccineData['ownerId'] = vaccine.ownerId;
          vaccineData['vaccineDate'] = web3.utils.hexToAscii(vaccine.vaccinatedDate).replace(/\u0000/gi, '');
          vaccineData['dogAgeYears'] = vaccine.dogAgeYears;
          vaccineData['dogAgeMonths'] = vaccine.dogAgeMonths;
          vaccineData['doctorId'] = vaccine.doctorId;
          vaccineData['hospitalName'] = web3.utils.hexToAscii(vaccine.hospitalName).replace(/\u0000/gi, '');
          vaccineData['vaccineName'] = web3.utils.hexToAscii(vaccine.vaccineName).replace(/\u0000/gi, '');
          console.log(vaccineData);
          res.status(200).send(vaccineData);
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
  })
});

module.exports = router;