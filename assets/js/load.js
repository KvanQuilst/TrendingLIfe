//const {getTrends} = require('./trends');
//import {initialize} from "./gol";
var intervalID;


function start(){
    // load the requests
    //var trends = getTrends();      
    /* of form "Title":value, "Traffic": value */
    console.log("Here!")
    //var trends = getTrends()
    //console.log("Trends in client ", trends)
    //loadTrends(trends)
    
    // start the gol
    var trends = getTrends()
    // seed the gol
    //seed(trends);
    intervalID = window.setInterval(() =>
        {trends = getTrends();}, 300000);
    
    resume();
    //generation();
}

function resume(){
    var color = document.getElementById("colorChoice").value;
    initialize(color);
}

function stop() {
    stopGame();
    window.clearInterval(intervalID);
}

function getTrends(){
    //Make ajax call to fetch data
    var d = $.Deferred();
    $.ajax({
        url: "/trends",
        type: "GET",
        dataType: 'json',
        success: function(resp){
             console.log(resp);
             console.log("Hello");
             loadTrends(resp);
             seed(10000);
         }
    }).done(function(response) {
        d.resolve(response);
    });
    // return d.promise();
}

function processTraffic(trends) {
    for(let i = 0; i < trends.length; i++) {
        let procTrend = trends[i].Traffic.slice(0,-2);
        /*let factor = procTrend[procTrend.length - 1];
        if (factor == 'M') {
            console.log("here");

            procTrend + '000000'
        } else if (factor == 'K') {
            console.log("here");
            procTrend + '000'
        }*/
        trends[i].Traffic = procTrend;
    }
    return trends;
}

function loadTrends(trends){
    trends = processTraffic(trends);
    console.log("trends in load trends: ", trends)
    var list = document.getElementById('fishbowl_list');
    list.innerHTML = "";
    for (let x = 0; x < trends.length; x++) {
        let i = trends[x];
        let node = document.createElement('li')
        node.appendChild(document.createTextNode(i.Title));
        list.appendChild(node);        
    }
}

start();