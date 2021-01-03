var express = require('express');
var BreederData = require('../models/BreederData');
var verifyToken = require('../authorize')

var router = express.Router();

router.delete('/:breederId', verifyToken, (req, res) => {
  console.log(req.params.id);
  // Database method to find and delete the breeder with the given id,
  BreederData.findOneAndDelete({ breederId: req.params.breederId }, (error, doc) => {
    if (error) {
      console.log(error);
      res.status(401).send(error);
    } else {
      console.log(doc);
      res.status(200).send(doc);
    }
  });
});

module.exports = router;