const express = require('express');
var jwt = require('jsonwebtoken');

const BreederData = require('../models/BreederData');

const router = express.Router();

router.post("", (req, res) => {
  // Database method to find whether there is an breeder account
  // with given email is available or not.
  BreederData.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(401).send(err);
    } else {
      if (!user) {
        // Case : The breeder account with the given email doesn't exists.
        res.send({ msg: "Invalid email" });
      } else if(user.password !== req.body.password) {
        // Case : The breeder account with the given email exists,
        //        but the given password is incorrect
        res.send({ msg: "Invalid password" });
      } else {
        // Case : The given email and password is correct
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey');   // Signing json web token.
        res.status(200).send({token, user});
      }
    }
  });
});

module.exports = router;