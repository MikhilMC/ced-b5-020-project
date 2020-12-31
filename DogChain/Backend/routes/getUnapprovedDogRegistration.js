var express = require('express');
var DogBirthRegistrationData = require('../models/DogBirthRegisterData');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/:dogId', verifyToken, (req, res) => {
  DogBirthRegistrationData.findOne({dogId: req.params.dogId, hasAddedToBlockchain: false}, (error, dog) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!dog) {
        console.log('Dog not available');
        res.send({msg: 'Dog not available.'});
      } else {
        console.log(dog);
        res.status(200).send(dog);
      }
    }
  });
});

module.exports = router