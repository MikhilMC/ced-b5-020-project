var express = require('express');
var DoctorData = require('../models/DoctorData');

var router = express.Router();

router.get('/:doctorId', (req, res) => {
  console.log(req.params.dogId);
  DoctorData.findOne({doctorId: req.params.doctorId, hasAddedToBlockchain: false}, (error, user) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!user) {
        console.log('User not available');
        res.send({msg: 'User not available.'});
      } else {
        console.log(user);
        res.status(200).send(user);
      }
    }
  });
});

module.exports = router;