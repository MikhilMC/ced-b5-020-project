var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('rewardStudent', {
        title: 'Reward Student'
    })
});

router.post('/studentRewarded', function(req, res, next) {
    data = req.body;
    console.log(data);
    // res.send(data);
    web3.eth.getAccounts()
    .then((accounts)=>{
        MyContract.methods.enrollStudent(data.id, data.sname)
        .send({ from: accounts[0] })
        .then((txn)=>{
            console.log(txn);
            res.send(txn);
        });
    });
});

module.exports = router;