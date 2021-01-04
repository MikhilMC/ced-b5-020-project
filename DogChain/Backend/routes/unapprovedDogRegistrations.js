var express = require('express');
var DogBirthRegisterData = require('../models/DogBirthRegisterData');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/', verifyToken, (req, res) => {
  // Database method to find all the dog birth registrations 
  // details which haven't been added to blockchain yet
  DogBirthRegisterData.find({hasAddedToBlockchain: false}, null, {sort: 'dogId'}, (error, dogs) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!dogs) {
        // CASE : There is no dog birth registrations details available
        //        which haven't been added to blockchain yet.
        res.send({msg: "There are no unapproved dog birth registrations."})
      } else {
        // CASE : The dog birth registrations details are available
        //        which haven't been added to blockchain yet.
        console.log(dogs);
        res.status(200).send(dogs);
      }
    }
  });
});

module.exports = router;