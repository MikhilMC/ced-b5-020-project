var express = require('express');
var DoctorData = require('../models/DoctorData');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/:doctorId', verifyToken, (req, res) => {
  console.log(req.params.dogId);
  // Database method to find the particular doctor with the given id
  // whose details haven't been added to blockchain yet.
  DoctorData.findOne({doctorId: req.params.doctorId, hasAddedToBlockchain: false}, (error, user) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!user) {
        // Case : Details of the doctor with the given id whose details haven't been 
        //        added to blockchain yet, is not present in the database.
        console.log('User not available');
        res.send({msg: 'User not available.'});
      } else {
        // Case : Details of the doctor with the given id whose details haven't been 
        //        added to blockchain yet, is present in the database.
        console.log(user);
        res.status(200).send(user);
      }
    }
  });
});

module.exports = router;