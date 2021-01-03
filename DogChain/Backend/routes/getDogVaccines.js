const express = require('express');
var verifyToken = require('../authorize');

const router = express.Router();

router.get('/:dogId', verifyToken, (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    // Smart contract method to find whether the details 
    // of the dog with given id is saved in the blockchain or not
    MyContract.methods.isDogPresent(req.params.dogId)
    .call({from: accounts[0]})
    .then(result => {
      if (!result) {
        // Case : The details of the dog with the given id is not saved in the blockchain
        console.log('Dog is not registered. Please check the dog ID.');
        res.send({msg: 'Dog is not registered. Please check the dog ID.'});
      } else {
        // Case : The details of the dog with the given id is available in the blockchain
        
        // Smart contract method to retreive all the vaccination ids done for this dog
        MyContract.methods.getDogVaccines(req.params.dogId)
        .call({from: accounts[0]})
        .then(dogVaccineIds => {
          console.log(dogVaccineIds);
          if (dogVaccineIds.length === 0) {
            // Case : Dog's vaccination id list is empty
            console.log('Dog vaccine list is empty.');
            res.send({emptyArrayMsg: 'Dog vaccine list is empty.'});
          } else {
            // Case : Dog's vaccination id list is not empty

            // Smart contract method to get all the details of the given vaccinations
            MyContract.methods.getVaccinesList(dogVaccineIds)
            .call({from: accounts[0]})
            .then(dogVaccinesList => {
              let dogVaccinesData = [];
              for (let i = 0; i < dogVaccineIds.length; i++) {
                let vaccine = {};
                vaccine['vaccId'] = dogVaccineIds[i];
                vaccine['dogId'] = dogVaccinesList[i].dogId;
                vaccine['ownerId'] = dogVaccinesList[i].ownerId;
                vaccine['vaccDate'] = web3.utils.hexToAscii(dogVaccinesList[i].vaccinatedDate).replace(/\u0000/gi, '');
                vaccine['doctorId'] = dogVaccinesList[i].doctorId;
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