var express = require('express');
var DogBirthRegistrationData = require('../models/DogBirthRegisterData');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/:dogId', verifyToken, (req, res) => {
  // Database method to find the particular dog with the given id 
  // whose details haven't been added to blockchain yet.
  DogBirthRegistrationData.findOne({dogId: req.params.dogId, hasAddedToBlockchain: false}, (error, dog) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!dog) {
        // Case : Details of the dog with the given id whose details
        //        haven't been added to blockchain yet, is not present in the database.
        console.log('Dog not available');
        res.send({msg: 'Dog not available.'});
      } else {
        // Case : Details of the dog with the given id whose details
        //        haven't been added to blockchain yet, is present in the database.
        console.log(dog);
        res.status(200).send(dog);
      }
    }
  });
});

module.exports = router