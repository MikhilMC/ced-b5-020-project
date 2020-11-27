var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('startClub', {
        title: 'Start a Club'
    });
});

router.post('/clubStarted', function(req, res, next) {
    data = req.body;
    console.log(data);
    // res.send(data);
    web3.eth.getAccounts()
    .then((accounts) => {
        MyContract.methods.startAClub(data.clubid, data.clubname, data.inchargename)
        .send({ from: accounts[0] })
        .then((txn) => {
            console.log(txn);
            res.send(txn);
        });
    })
});

module.exports = router;