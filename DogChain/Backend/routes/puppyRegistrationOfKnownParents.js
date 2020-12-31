var express = require('express');
var DogBirthRegisterData = require('../models/DogBirthRegisterData');
var verifyToken = require('../authorize');

var router = express.Router();

router.post('/', verifyToken, (req, res) => {
  // console.log(req.body);
  dogData = req.body;
  DogBirthRegisterData.findOne({dogId: dogData['dogId']}, (error1, dog1)=>{
    if (error1) {
      console.log(error1);
      res.status(401).send(error1);
    } else {
      if (dog1) {
        console.log('This dog is already registered');
        res.send({msg: 'This dog is already registered'});
      } else {
        DogBirthRegisterData.findOne({dogId: dogData['fatherId'], hasAddedToBlockchain: true}, (error2, dog2)=>{
          if (error2) {
            console.log(error2);
            res.status(401).send(error2);
          } else {
            if (!dog2) {
              console.log("The father of your dog is not registered/approved in the system. Please check the father's ID");
              res.send({msg: "The father of your dog is not registered/approved in the system. Please check the father's ID"});
            } else {
              DogBirthRegisterData.findOne({dogId: dogData['motherId'], hasAddedToBlockchain: true}, (error3, dog3)=>{
                if (error3) {
                  console.log(error3);
                  res.status(401).send(error3);
                } else {
                  if (!dog3) {
                    console.log("The mother of your dog is not registered/approved in the system. Please check the mother's ID");
                    res.send({msg: "The mother of your dog is not registered/approved in the system. Please check the mother's ID"});
                  } else {
                    dogData['hasAddedToBlockchain'] = false;
                    dog = new DogBirthRegisterData(dogData);
                    dog.save((error4, dog4) => {
                      if (error4) {
                        console.log(error4);
                        res.status(401).send(error4);
                      } else {
                        console.log(dog4);
                        res.status(200).send(dog4);
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