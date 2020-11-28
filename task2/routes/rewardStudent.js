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
        MyContract.methods.approve(data.inchargeaddress, data.amount)
        .send({ from: accounts[0] })
        .then((approveTxn)=>{
            console.log(approveTxn);
            MyContract.methods.reward(data.studentaddress, data.amount)
            .send({ from: accounts[0] })
            .then((txn)=>{
                console.log(txn);
                res.send(txn);
            });
        });
    });
});

module.exports = router;