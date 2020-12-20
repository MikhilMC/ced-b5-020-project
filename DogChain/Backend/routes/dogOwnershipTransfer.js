var express = require('express');
var DogOwnershipTransferData = require('../models/DogOwnershipTransferData');

var router = express.Router();

router.post('/', (req, res) => {
  transferData = req.body;
});

module.exports = router;