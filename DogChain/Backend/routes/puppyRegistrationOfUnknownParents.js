var express = require('express');
var DogBirthRegisterData = require('../models/DogBirthRegisterData');
var verifyToken = require('../authorize');

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  // console.log(req.body);
  dogData = req.body;
  DogBirthRegisterData.findOne({dogId: dogData['dogId']}, (error1, dog1) => {
    if (error1) {
      console.log(error1);
      res.status(401).send(error1);
    } else {
      if (dog1) {
        console.log('Dog is already registered');
        res.send({msg: 'Dog is already registered'});
      } else {
        dogData['hasAddedToBlockchain'] = false;
        dog = new DogBirthRegisterData(dogData);
        dog.save((error2, dog2) => {
          if (error2) {
            console.log(error2);
            res.status(401).send(error2);
          } else {
            console.log(dog2);
            res.status(200).send(dog2);
          }
        });
      }
    }
  });
});

module.exports = router;