var express = require('express');
var DoctorData = require('../models/DoctorData');
var verifyToken = require('../authorize');

var router = express.Router();

router.delete('/:doctorId', verifyToken, (req, res) => {
  // Database method to find and delete the doctor with the given id
  DoctorData.findOneAndDelete({ doctorId: req.params.doctorId }, (error, doc) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      console.log(doc);
      res.status(200).send(doc);
    }
  });
});

module.exports = router;