//const {getTrends} = require('./trends');
//import {initialize} from "./gol";


function daily(){
    console.log("Here!")
    var trends = getTrends()
    resume();
}

function overTime(term){
    console.log("Here!")
    console.log("Term")
    var trends = getTotTrends(term)
    resume();
}

function resume(){
    var color = document.getElementById("colorChoice").value;
    initialize(color);
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
             seed(500);
         }
    }).done(function(response) {
        d.resolve(response);
    });
    // return d.promise();
}

function getTotTrends(word){
    //Make ajax call to fetch data
    var d = $.Deferred();
    $.ajax({
        url: "/overtime",
        type: "GET",
        data: {term:word},
        dataType: 'json',
        success: function(resp){
             //console.log(resp);
             console.log("ServerSide OverTime here");
             loadOverTime(resp);
             seedOverTime(resp);
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

function loadOverTime(resp){
    console.log("client side fuckery");
    console.log(resp.length)
    //console.log(resp);
    var list = document.getElementById('fishbowl_list');
    list.innerHTML = "";
    for (let x = 0; x < resp.length; x++) {
        let i = resp[x];
        let node = document.createElement('li')
        let message = i.Time;
        message += " Traffic: ";
        message += i.Traffic;
        console.log(message);
        node.appendChild(document.createTextNode(message));
        list.appendChild(node);        
    }
    
}

daily();