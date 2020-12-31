var express = require('express');
var DogBirthRegisterData = require('../models/DogBirthRegisterData');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/', verifyToken, (req, res) => {
  DogBirthRegisterData.find({hasAddedToBlockchain: false}, null, {sort: 'dogId'}, (error, dogs) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!dogs) {
        res.send({msg: "There are no unapproved dog birth registrations."})
      } else {
        console.log(dogs);
        res.status(200).send(dogs);
      }
    }
  });
});

module.exports = router;