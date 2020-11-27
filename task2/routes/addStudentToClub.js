var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('addStudentToClub', {
        title: 'Add Student To A Club'
    });
});

router.post('/addedToClub', function(req, res, next) {
    data = req.body;
    console.log(data);
    // res.send(data);
    web3.eth.getAccounts()
    .then((accounts)=>{
        MyContract.methods.enrollStudentInClub(data.studentid, data.clubid, data.inchargeaddress)
        .send({ from: accounts[0] })
        .then((txn)=>{
            console.log(txn);
            res.send(txn);
        });
    });
});

module.exports = router;