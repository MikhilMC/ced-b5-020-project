var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'CS Rewards',
        links: [
            {
                source: '/enroll-student',
                name: 'Enroll a Student'
            },
            {
                source: '/start-club',
                name: 'Start a Club'
            },
            {
                source: '/add-student-to-club',
                name: "Add Student to a Club"
            },
            {
                source: '/reward-student',
                name: 'Reward a Student'
            },
            {
                source: '/get-balance',
                name: 'Get the Balance'
            }
        ]
    });
});

module.exports = router;
