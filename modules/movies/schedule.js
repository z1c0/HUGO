var cron = require('cron'),
    soap = require('soap'),
    moment = require('moment'),
    request = require('request');


const megaplexWsdlUrl = "http://linz.megaplex.at/webservice/serviceext.asmx?wsdl";
const megaplexContentUrl = "http://www.megaplex.at/content/";

var movies = [];

function getIftttUrl(eventName, iftttkey) {
  return 'https://maker.ifttt.com/trigger/' + eventName + '/with/key/' + iftttkey;
}

function updateDb(data, movies) {
  movies.forEach(function(m) {
    data.db.find({ title: m.title }, function (err, docs) {
      if (docs.length == 0) {
        //console.log(m);
        // not found -> insert into db
        var doc = {
          title : m.title,
          at : new Date(),
        };
        data.db.insert(doc);
        
        request({
          url: getIftttUrl('new_movie', data.config.iftttkey),
          method: 'POST',
          json: {
            value1 : m.title,
          }
        });
      }
    });
  }, this);
}

function checkMovies(data) {
  movies = [];
  var url = megaplexWsdlUrl;
  soap.createClient(url, function(err, client) {
    if (!err) {
      var from = moment().format('YYYY-MM-DD');
      var to = moment().add(2, 'w').format('YYYY-MM-DD');
      var args = { FromDate : from, ToDate: to, SQLFilter : '', SQLSort : '' };
      client.GetSchedule(args, function(err, result) {
        try {
          var movieMap = [];
          var details = result.GetScheduleResult.ScheduleDetails;
          details.forEach(function(d) {
            //console.log(d);
            var title = d.FilmTitle;
            if (title.startsWith('OV')) {
              movieMap[title] = {
                title : title,
                nation : d.FilmNation,
                image : megaplexContentUrl + d.FilmImg.split('/')[1],
                start : d.FilmStart
              };
            }
          }, this);
          // Create array from map.
          for (var key in movieMap) {
            movies.push(movieMap[key]);
          }
          //console.log(movies);
          updateDb(data, movies);
        }
        catch (e) {
          console.log(e);
        }
      });
    }
  });
}

module.exports = {
  init : function(data) {
    // run every hour 
    // */20 * * * * *",
    var cronJob = cron.job("0 0 */1 * * *", function() {
      checkMovies(data);
    });
    cronJob.start();
    checkMovies(data);
  },
  fetch : function(callback) {
    callback(movies);
  }
};