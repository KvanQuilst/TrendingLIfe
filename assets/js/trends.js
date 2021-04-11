const googleTrends = require('google-trends-api');

var optionsObject = {
    keyword: '',
    startTime: 'time',
    endTime: '',
    geo: '',
    hl: '',
    timezone: '',
    category: '',
    property: '',
    resolution: '',
    granularTimeResolution: ''

}

var code = 'US';

var trendData;
var trendList = [];

var trendTOTData;
var trendTOTList = [];

function getList() {
    return googleTrends.dailyTrends({ geo: code })
    .then(function(results) {
        var content;
        trendData = JSON.parse(results);
        // console.log(JSON.stringify(JSON.parse(results), null, 2));
        // console.log(trendData.default.trendingSearchesDays[0])
        trendList = []

        // console.log("trending searches: ", trendData.default.trendingSearchesDays[0].trendingSearches[0].title.query)
        for (var i = 0; i < trendData.default.trendingSearchesDays[0].trendingSearches.length; i++) {
            // console.log("title: ", trendData.default.trendingSearchesDays[0].trendingSearches[i].title.query)
            // console.log("traffic: ", trendData.default.trendingSearchesDays[0].trendingSearches[i].formattedTraffic)
            ob = {
                Title: trendData.default.trendingSearchesDays[0].trendingSearches[i].title.query,
                Traffic: trendData.default.trendingSearchesDays[0].trendingSearches[i].formattedTraffic
            }
            trendList.push(ob);
        }
        return trendList;
    })
    .catch (function(err){
        console.error('Oh no there was an error', err);
    })
}

function getToTList(term) {
    start = new Date('2021-01-01');
    console.log("in Trends");
    return googleTrends.interestOverTime({ geo: code, keyword:term, startTime:start })
    .then(function(results) {
        console.log("in trends 2.0")
        //console.log("AYYYYE");
        trendTOTData = JSON.parse(results);
        //console.log(JSON.stringify(trendTOTData));
        // console.log(JSON.stringify(JSON.parse(results), null, 2));
        // console.log(trendData.default.trendingSearchesDays[0])
        trendTOTList = []
        // console.log("trending searches: ", trendData.default.trendingSearchesDays[0].trendingSearches[0].title.query)
        for (var i = 0; i < trendTOTData.default.timelineData.length; i++) {
            // console.log("title: ", trendData.default.trendingSearchesDays[0].trendingSearches[i].title.query)
            // console.log("traffic: ", trendData.default.trendingSearchesDays[0].trendingSearches[i].formattedTraffic)
            ob = {
                Time: trendTOTData.default.timelineData[i].formattedTime,
                Traffic: trendTOTData.default.timelineData[i].value[0]
            }
            trendTOTList.push(ob);
        }
        return trendTOTList;
    })
    .catch (function(err){
        console.error('Oh no there was an error', err);
    })
}




async function loadTrends() {
    const list = await getList();
    //console.log(list)
    return list;
}

async function loadTotTrends(term) {
    const list = await getToTList(term);
    //console.log(list)
    return list;
}


exports.loadTrends = loadTrends;
exports.loadTotTrends = loadTotTrends;
