var express = require('express');
var BreederData = require('../models/BreederData');

var router = express.Router();

router.get('/:breederId', (req, res) => {
  console.log(req.params.userId);
  BreederData.findOne({breederId: req.params.breederId, hasAddedToBlockchain: false}, (error, user) => {
    if (error) {
      console.log(error);
      res.status(401).send(error)
    } else {
      if (!user) {
        console.log('User not available');
        res.send({msg: 'User not available.'});
      } else {
        console.log(user);
        res.status(200).send(user);
      }
    }
  });
});

module.exports = router;