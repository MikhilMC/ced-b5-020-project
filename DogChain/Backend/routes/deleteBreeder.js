var express = require('express');
var BreederData = require('../models/BreederData');

var router = express.Router();

router.delete('/:breederId', (req, res) => {
  console.log(req.params.id);
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