const googleTrends = require('google-trends-api');

var optionsObject = {
    startDate: '2019-01-10',
    geo: 'US',
    timezone: '',
}

var code = 'US';

var trendData;
var trendList = [];

function getList() {
    return googleTrends.dailyTrends( {
        trendDate: new Date('2021-04-10'),
        timezone: 'PT',
        geo: code })
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



async function loadTrends() {
    const list = await getList();
    console.log(list)
    return list;
}


exports.loadTrends = loadTrends;

