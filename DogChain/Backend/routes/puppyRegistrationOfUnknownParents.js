var express = require('express');
var DogBirthRegisterData = require('../models/DogBirthRegisterData');
var BreederData = require('../models/BreederData');
var verifyToken = require('../authorize');

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  dogData = req.body;
  // Database method to find the dog birth registration data with the given id 
  DogBirthRegisterData.findOne({dogId: dogData['dogId']}, (error1, dog1) => {
    if (error1) {
      console.log(error1);
      res.status(401).send(error1);
    } else {
      if (dog1) {
        // CASE : The dog birth registration with given id is being used
        console.log('Dog is already registered');
        res.send({msg: 'Dog is already registered'});
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
              
              // The following field of a dog birth registration 
              // details is set to false, because this dog birth registration 
              // details have not saved to blockchain yet.
              dogData['hasAddedToBlockchain'] = false;

              dog = new DogBirthRegisterData(dogData);
              
              // Database method for saving the dog birth 
              // registration data into the database
              dog.save((error3, dog2) => {
                if (error3) {
                  console.log(error3);
                  res.status(401).send(error3);
                } else {
                  console.log(dog2);
                  res.status(200).send(dog2);
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