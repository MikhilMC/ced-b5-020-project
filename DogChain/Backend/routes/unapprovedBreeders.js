var express = require('express');
var BreederData = require('../models/BreederData');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/', verifyToken, (req, res) => {
  BreederData.find({hasAddedToBlockchain: false}, null, {sort: 'breederId'}, (error, breeders) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!breeders) {
        res.send({msg: "There are no unapproved breeders."})
      } else {
        console.log(breeders);
        res.status(200).send(breeders);        
      }
    }
  });
});

module.exports = router;