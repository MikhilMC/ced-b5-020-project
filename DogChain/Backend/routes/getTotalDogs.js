var express = require('express');

var router = express.Router();

router.get('/:userId', (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    MyContract.methods.getTotalDogIds(req.params.userId)
    .call({from: accounts[0]})
    .then(totalDogs => {
      console.log(totalDogs);
      res.status(200).send(totalDogs);
    })
    .catch(error => {
      console.log(error);
      res.status(401).send(error);
    });
  });
});

module.exports = router;