var express = require('express');
var verifyToken = require('../authorize');

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  treatData = req.body;
  console.log(treatData);
  web3.eth.getAccounts()
  .then(accounts => {
    // Smart contract method to find whether the data of the treatment 
    // with the given id is already saved in the blockchain or not.
    MyContract.methods.isTreatmentDataPresent(treatData.treatId)
    .call({from: accounts[0]})
    .then(result1 => {
      console.log(result1);
      if (result1) {
        // CASE : The data of the treatment with the given id 
        //        is already present in the blockchain.
        console.log('Treatment data is already present');
        res.send({msg: 'Treatment data is already present'});
      } else {
        // CASE : The data of the treatment with the given id 
        //        is absent in the blockchain.
        
        // Smart contract method to check whether the details 
        // of the dog with the given id is saved in the blockchain or not.
        MyContract.methods.isDogPresent(treatData.dogId)
        .call({from: accounts[0]})
        .then(result2 => {
          console.log(result2);
          if (!result2) {
            // CASE : The given dog's data is absent in the blockchain
            console.log('Dog with this ID is not registered. Please check the dog ID.');
            res.send({msg: 'Dog with this ID is not registered. Please check the dog ID.'});
          } else {
            // CASE : The given dog's data is present in the blockchain
            
            // Smart contract method to find whether the details 
            // of the doctor with the given id is saved in the blockchain or not
            MyContract.methods.isDoctorPresent(treatData.doctorId)
            .call({from: accounts[0]})
            .then(result3 => {
              console.log(result3);
              if (!result3) {
                // CASE : Doctor data is absent in the blockchain
                console.log('Doctor with this ID is not registered. Please check the doctor ID.');
                res.send({doctorErrorMsg: 'Doctor with this ID is not registered. Please check the doctor ID.'});
              } else {
                // CASE : Doctor data is present in the blockchain

                // Smart contract method to retrieve the details of the dog with the given id.
                MyContract.methods.getDogData(treatData.dogId)
                .call({from: accounts[0]})
                .then(dog => {
                  let dob = web3.utils.hexToAscii(dog.dateOfBirth).replace(/\u0000/gi, '');
                  let t1 = new Date(treatData.treatDate);
                  let t2 = new Date(dob);
                  let ageInYears = t1.getFullYear() - t2.getFullYear();
                  let ageInMonths = t1.getMonth() - t2.getMonth();
                  if (ageInMonths < 0) {
                    ageInYears--;
                    ageInMonths = 12 + t1.getMonth() - t2.getMonth();
                  }
                  let symptoms = treatData.symptoms.map(web3.utils.asciiToHex);
                  let prescription = treatData.prescription.map(web3.utils.asciiToHex)
                  console.log(symptoms);
                  console.log(prescription)
                  
                  // Smart contract method to save the details 
                  // of the treatment to the blockchain
                  MyContract.methods.treatDog(
                    treatData.treatId, 
                    treatData.dogId, 
                    web3.utils.asciiToHex(treatData.treatDate), 
                    ageInYears, 
                    ageInMonths, 
                    treatData.doctorId, 
                    symptoms, 
                    web3.utils.asciiToHex(treatData.verdict), 
                    prescription
                  )
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
                  res.status(401).send(error4);
                });
              }
            })
            .catch(error3 => {
              console.log(error3);
              res.status(401).send(error3);
            })
          }
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
    });
  })
});

module.exports = router;