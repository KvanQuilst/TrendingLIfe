var express = require('express');
var router = express.Router();
var getToTList = require('../assets/js/trends').loadTotTrends;


router.get('/', function(req, res, next) {
    var user = res.locals.user;
    console.log("In Router")
    //console.log('user object', req.params);
    getToTList(req.query.term).then((result)=> {
        console.log("SENDING REPORT RESULTS "); //, result
        //console.log(result)
        res.send(result);
    }).catch((err)=> {
        console.log("Error in getAllReports router: ", err);
        throw new Error(err);
    });
});

module.exports = router;