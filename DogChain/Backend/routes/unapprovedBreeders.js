var express = require('express');
var BreederData = require('../models/BreederData');
var verifyToken = require('../authorize');

var router = express.Router();

router.get('/', verifyToken, (req, res) => {
  // Database method to find all the breeder accounts 
  // whose details haven't been added to blockchain yet
  BreederData.find({hasAddedToBlockchain: false}, null, {sort: 'breederId'}, (error, breeders) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      if (!breeders) {
        // Case : There is no breeder accounts available
        //        whose details haven't been added to blockchain yet.
        res.send({msg: "There are no unapproved breeders."})
      } else {
        // Case : There are breeder accounts available
        //        whose details haven't added to blockchain yet.
        console.log(breeders);
        res.status(200).send(breeders);        
      }
    }
  });
});

module.exports = router;