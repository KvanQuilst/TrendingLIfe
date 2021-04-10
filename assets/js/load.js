//const {getTrends} = require('./trends');
//const {seed, generation} = require('./gol');


function initialize(){
    // load the requests
    //var trends = getTrends();      
    /* of form "Title":value, "Traffic": value */
    console.log("Here!")
    var trends = {"list":[
        {"Title":"Mariah Carey", "Traffic":"20000"},
        {"Title":"Other Carey", "Traffic":"2000"}] }; 
    // Trends
    loadTrends(trends);
    // seed the gol
    //seed(trends);
    // start the gol
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

initialize();