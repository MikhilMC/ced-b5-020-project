var express = require('express');

var router = express.Router();

router.get('/:userId', (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    MyContract.methods.getSoldDogIds(req.params.userId)
    .call({from: accounts[0]})
    .then(soldDogs => {
      console.log(soldDogs);
      res.status(200).send(soldDogs);
    })
    .catch(error => {
      console.log(error);
      res.status(401).send(error);
    });
  });
});

module.exports = router;