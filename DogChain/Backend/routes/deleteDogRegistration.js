var express = require('express');
var DogBirthRegisterData = require('../models/DogBirthRegisterData');

var router = express.Router();

router.delete('/:dogId', (req, res) => {
  console.log(req.params.dogId);
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