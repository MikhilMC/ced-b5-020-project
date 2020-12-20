var express = require('express');
var DoctorData = require('../models/DoctorData');

var router = express.Router();

router.delete('/:userId', (req, res) => {
  DoctorData.findOneAndDelete({ userId: req.params.userId }, (error, doc) => {
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