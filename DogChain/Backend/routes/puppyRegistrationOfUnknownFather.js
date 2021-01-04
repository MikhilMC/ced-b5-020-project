var express = require('express');
var DogBirthRegisterData = require('../models/DogBirthRegisterData');
var BreederData = require('../models/BreederData');
var verifyToken = require('../authorize');

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  dogData = req.body;
  // Database method to find the dog birth registration data with the given id
  DogBirthRegisterData.findOne({dogId: dogData['dogId']}, (error1, dog1)=>{
    if (error1) {
      console.log(error1);
      res.status(401).send(error1);
    } else {
      if (dog1) {
        // CASE : The dog birth registration with given id is being used
        console.log('This dog is already registered');
        res.send({msg: 'This dog is already registered'});
      } else {
        // CASE : The dog birth registration with given id is not being used
        
        // Database method to find the breeder account 
        // with the given breeder id which also have added to blockchain.
        BreederData.findOne({breederId: dogData['breederId'], hasAddedToBlockchain: true}, (error2, breeder) => {
          if (error2) {
            console.log(error2);
            res.status(401).send(error2);
          } else {
            if (!breeder) {
              // CASE : Breeder account haven't been registered.
              console.log("Breeder account is not registered.");
              res.send({breederErrorMsg: "Breeder account is not registered."})
            } else {
              // CASE : Breeder account have registered.
              
              // Database method to find the details of the dog's mother
              // which have already added to blockchain.
              DogBirthRegisterData.findOne({dogId: dogData['motherId'], hasAddedToBlockchain: true}, (error3, dog2)=>{
                if (error3) {
                  console.log(error3);
                  res.status(401).send(error3);
                } else {
                  if (!dog2) {
                    // CASE : The dog's mother haven't been registered.
                    console.log("The mother of your dog is not registered/approved in the system. Please check the mother's ID");
                    res.send({msg: "The mother of your dog is not registered/approved in the system. Please check the mother's ID"});
                  } else {
                    // CASE : The dog's mother have registered.
                    
                    // The following field of a breeder account is set to false,
                    // because the breeder account details have not saved to blockchain yet.
                    dogData['hasAddedToBlockchain'] = false;
                    
                    dog = new DogBirthRegisterData(dogData);
                    // Database method for saving the dog birth 
                    // registration data into the database
                    dog.save((error4, dog3) => {
                      if (error4) {
                        console.log(error4);
                        res.status(401).send(error4);
                      } else {
                        console.log(dog3);
                        res.status(200).send(dog3);
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    }
  });  
});

module.exports = router;