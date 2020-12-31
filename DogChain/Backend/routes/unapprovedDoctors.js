var express = require('express');
var DoctorData = require('../models/DoctorData');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/', verifyToken, (req, res) => {
  DoctorData.find({hasAddedToBlockchain: false}, null, {sort: 'doctorId'}, (error, doctors) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!doctors) {
        res.send({msg: "There are no unapproved doctors."})
      } else {
        console.log(doctors);
        res.status(200).send(doctors);
      }
    }
  });
});

module.exports = router;