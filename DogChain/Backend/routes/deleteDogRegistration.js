var express = require('express');
var DogBirthRegisterData = require('../models/DogBirthRegisterData');
var verifyToken = require('../authorize');

var router = express.Router();

router.delete('/:dogId', verifyToken, (req, res) => {
  console.log(req.params.dogId);
  // Database method to find and delete the birth registration data of the dog with the given id
  DogBirthRegisterData.findOneAndDelete({dogId: req.params.dogId}, (error, dog)=>{
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      console.log(dog);
      res.status(200).send(dog);
    }
  });
});

module.exports = router;