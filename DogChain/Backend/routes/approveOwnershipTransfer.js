var express = require('express');
var BreederData = require('../models/BreederData');

var router = express.Router();

router.post('/:userId', (req, res) => {
  console.log(req.params.userId);
});

module.exports = router;