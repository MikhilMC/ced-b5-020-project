var express = require('express');
const { default: Web3 } = require('web3');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('getBalance', {
        title: 'Get Balance'
    });
});

router.post('/balance', function(req, res, next) {
    data = req.body;
    console.log(data);
    // res.send(data);
    web3.eth.getAccounts()
    .then((accounts)=>{
        MyContract.methods.balanceOf(data.address)
        .call({ from: accounts[0] })
        .then((error, result)=>{
            if(!error) {
                console.log(result);
                // res.render('balance', {
                //     title: 'Balance',
                //     address: data.address,
                //     result
                // });
            }
        });
    });
});

module.exports = router;