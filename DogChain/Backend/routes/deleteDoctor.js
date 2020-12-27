var express = require('express');
var DoctorData = require('../models/DoctorData');

var router = express.Router();

router.delete('/:doctorId', (req, res) => {
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