const express = require('express');
var jwt = require('jsonwebtoken');

const AuthorityData = require('../models/AuthorityData');

const router = express.Router();

router.post("", (req, res) => {
  // Database method to find whether there is an authority account
  // with given email is available or not.
  AuthorityData.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(401).send(err);
    } else {
      if (!user) {
        // CASE : Authority account with the given email doesn't exists.
        res.send({ msg: "Invalid email" });
      } else if(user.password !== req.body.password) {
        // CASE : Authority account with the given email exists,
        //        but the given password is incorrect
        res.send({ msg: "Invalid password" });
      } else {
        // CASE : The given email and password is correct
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey');   // Signing json web token.
        res.status(200).send({token, user});
      }
    }
  });
});

module.exports = router;