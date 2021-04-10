//const {getTrends} = require('./trends');
//import {initialize} from "./gol";


function start(){
    // load the requests
    //var trends = getTrends();      
    /* of form "Title":value, "Traffic": value */
    console.log("Here!")
    var trends = {"list":[
        {"Title":"Mariah Carey", "Traffic":"20000"},
        {"Title":"Other Carey", "Traffic":"2000"}] }; 
    // Trends
    loadTrends(trends);

    // start the gol
    initialize();
    // seed the gol
    //seed(trends);
    
    //generation();
}


function loadTrends(trends){
    var list = document.getElementById('fishbowl_list');
    for (x in trends.list){
        let i = trends.list[x];
        let node = document.createElement('li')
        console.log(i);
        node.appendChild(document.createTextNode(i.Title));
        list.appendChild(node);        
    }
}

start();