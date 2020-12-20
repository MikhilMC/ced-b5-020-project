var express = require('express');

var router = express.Router();

router.get('/:userId', (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    MyContract.methods.getTotalDogIds(req.params.userId)
    .call({from: accounts[0]})
    .then(totalDogs => {
      console.log(totalDogs);
      // res.status(200).send(totalDogs);
      MyContract.methods.getSoldDogIds(req.params.userId)
      .call({from: accounts[0]})
      .then(soldDogs => {
        console.log(soldDogs);
        // res.status(200).send(soldDogs);
        let totalDogIds = Array(totalDogs);
        let soldDogIds = Array(soldDogs);
        let currentDogIds = [];
        for (let i = 0; i < totalDogIds.length; i++) {
          if (!soldDogIds.includes(totalDogIds[i])) {
            currentDogIds.push(totalDogIds[i]);
          }
        }
        console.log(currentDogIds);
        res.send(currentDogIds);
        // MyContract.methods.getSoldDogIds(req.params.userId)
        // .call({from: accounts[0]})
        // .then(currentDogs => {
        //   console.log(currentDogs);
        //   res.status(200).send(currentDogs);
        // })
        // .catch(error3 => {
        //   console.log(error3);
        //   res.status(401).send(error3);
        // });        
      })
      .catch(error2 => {
        console.log(error2);
        res.status(401).send(error2);
      });      
    })
    .catch(error1 => {
      console.log(error1);
      res.status(401).send(error1);
    });
  });
});

module.exports = router;