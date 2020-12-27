var express = require('express');

var router = express.Router();

router.get('/:breederId', (req, res) => {
  web3.eth.getAccounts()
  .then(accounts => {
    MyContract.methods.getTotalDogIds(req.params.breederId)
    .call({from: accounts[0]})
    .then(totalDogIds => {
      console.log(totalDogIds);
      // res.status(200).send(totalDogs);
      MyContract.methods.getDogsList(totalDogIds)
      .call({from: accounts[0]})
      .then(totalDogs => {
        // console.log(totalDogs);
        // res.status(200).send(totalDogs)
        let totalDogDetails = []
        for (const dog in totalDogs) {
          let dogData = {}
          dogData['dogName'] = web3.utils.hexToAscii(totalDogs[dog].dogName).replace(/\u0000/gi, '');
          dogData['breed'] = web3.utils.hexToAscii(totalDogs[dog].breed).replace(/\u0000/gi, '');
          dogData['colour'] = web3.utils.hexToAscii(totalDogs[dog].colour).replace(/\u0000/gi, '');
          if (totalDogs[dog].sex === 0) {
            dogData['sex'] = 'dog'
          } else {
            dogData['sex'] = 'bitch'
          }
          // dogData['dob'] = web3.utils.hexToAscii(totalDogs[dog].dateOfBirth).replace(/\u0000/gi, '');
          // dogData['fatherId'] = totalDogs[dog].fatherId;
          // dogData['fatherName'] = web3.utils.hexToAscii(totalDogs[dog].fatherName).replace(/\u0000/gi, '');
          // dogData['motherId'] = totalDogs[dog].motherId;
          // dogData['motherName'] = web3.utils.hexToAscii(totalDogs[dog].motherName).replace(/\u0000/gi, '');
          // dogData['breederId'] = totalDogs[dog].breederId;
          // dogData['ownerId'] = totalDogs[dog].ownerIds[totalDogs[dog].currentOwner];
          totalDogDetails.push(dogData);
        }
        console.log(totalDogDetails)
        res.status(200).send({totalDogIds, totalDogDetails});
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