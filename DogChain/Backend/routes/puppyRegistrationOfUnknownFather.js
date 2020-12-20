var express = require('express');
var DogBirthRegisterData = require('../models/DogBirthRegisterData');
var BreederData = require('../models/BreederData');

var router = express.Router();

router.post('/', (req, res) => {
  // console.log(req.body);
  dogData = req.body;
  DogBirthRegisterData.findOne({userId: dogData['dogId']}, (error1, dog1)=>{
    if (error1) {
      console.log(error1);
      res.status(401).send(error1);
    } else {
      if (dog1) {
        console.log('This dog is already registered');
        res.send({msg: 'This dog is already registered'});
      } else {
        DogBirthRegisterData.findOne({userId: dogData['motherId'], hasAddedToBlockchain: true}, (error2, dog2)=>{
          if (error2) {
            console.log(error2);
            res.status(401).send(error2);
          } else {
            if (!dog2) {
              console.log("The mother of your dog is not registered in the system. Please check the mother's ID");
              res.send({msg: "The mother of your dog is not registered in the system. Please check the mother's ID"});
            } else {
              dogData['hasAddedToBlockchain'] = false;
              dog = new DogBirthRegisterData(dogData);
              dog.save((error3, dog3) => {
                if (error3) {
                  console.log(error3);
                  res.status(401).send(error3);
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
});

module.exports = router;