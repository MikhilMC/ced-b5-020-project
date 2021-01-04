var express = require('express');
var OwnershipTransferData = require('../models/DogOwnershipTransferData');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/', verifyToken, (req, res) => {
  // Database method to find all the ownership transfer requests which haven't been approved yet
  OwnershipTransferData.find({hasAddedToBlockchain: false}, null, {sort: 'dogId'}, (error, transfers) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!transfers) {
        // CASE : There is no unapproved ownership transfer requests available
        res.send({msg: "There are no unapproved dog ownership transfers."})
      } else {
        // CASE : There are unapproved ownership transfer requests available
        console.log(transfers);
        res.status(200).send(transfers);
      }
    }
  });
});

module.exports = router;