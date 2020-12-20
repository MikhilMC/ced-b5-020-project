var express = require('express');
var DoctorData = require('../models/DoctorData');

var router = express.Router();

router.get('/', (req, res) => {
  DoctorData.find({hasAddedToBlockchain: false}, null, {sort: 'userId'}, (error, doctors) => {
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