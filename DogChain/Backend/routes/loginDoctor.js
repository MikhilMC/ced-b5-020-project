const express = require('express');
const DoctorData = require('../models/DoctorData');

const router = express.Router();

router.post("", (req, res) => {
  // data = req.body;
  // console.log(data);
  DoctorData.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(401).send(err);
    } else {
      if (!user) {
        res.send({ msg: "Invalid email" });
      } else if(user.password !== req.body.password) {
        res.send({ msg: "Invalid password" });
      } else {
        res.status(200).send(user);
      }
    }
  });
});

module.exports = router;