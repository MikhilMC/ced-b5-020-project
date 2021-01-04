var express = require('express');
var DoctorData = require('../models/DoctorData');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/', verifyToken, (req, res) => {
  // Database method to find all the doctor accounts 
  // whose details haven't been added to blockchain yet
  DoctorData.find({hasAddedToBlockchain: false}, null, {sort: 'doctorId'}, (error, doctors) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!doctors) {
        // CASE : There is no doctor accounts available
        //        whose details haven't been added to blockchain yet.
        res.send({msg: "There are no unapproved doctors."})
      } else {
        // CASE : There is doctor accounts available
        //        whose details haven't been added to blockchain yet.
        console.log(doctors);
        res.status(200).send(doctors);
      }
    }
  });
});

module.exports = router;