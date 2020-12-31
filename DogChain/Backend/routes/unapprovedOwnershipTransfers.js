var express = require('express');
var OwnershipTransferData = require('../models/DogOwnershipTransferData');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/', verifyToken, (req, res) => {
  OwnershipTransferData.find({hasAddedToBlockchain: false}, null, {sort: 'dogId'}, (error, transfers) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!transfers) {
        res.send({msg: "There are no unapproved dog ownership transfers."})
      } else {
        console.log(transfers);
        res.status(200).send(transfers);
      }
    }
  });
});

module.exports = router;