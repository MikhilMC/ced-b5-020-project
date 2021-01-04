var express = require('express');
var BreederData = require('../models/BreederData');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/:breederId', verifyToken, (req, res) => {
  console.log(req.params.breederId);
  // Database method to find the particular breeder with the given id
  // whose details haven't been added to blockchain yet.
  BreederData.findOne({breederId: req.params.breederId, hasAddedToBlockchain: false}, (error, user) => {
    if (error) {
      console.log(error);
      res.status(401).send(error)
    } else {
      if (!user) {
        // CASE : Details of the breeder with the given id whose details haven't been 
        //        added to blockchain yet, is not present in the database.
        console.log('User not available');
        res.send({msg: 'User not available.'});
      } else {
        // CASE : Details of the breeder with the given id whose details haven't been 
        //        added to blockchain yet, is present in the database.
        console.log(user);
        res.status(200).send(user);
      }
    }
  });
});

module.exports = router;