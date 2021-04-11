var express = require('express');
var router = express.Router();
var getTrends = require('../assets/js/trends').loadTrends;

router.get('/', function(req, res, next) {
    var user = res.locals.user;
    // console.log('user object', user);
    getTrends().then((result)=> {
        console.log("SENDING REPORT RESULTS "); //, result
        console.log(result)
        res.send(result);
    }).catch((err)=> {
        console.log("Error in getAllReports router: ", err);
        throw new Error(err);
    });
});

module.exports = router;