var cron = require('cron'),
    soap = require('soap'),
    moment = require('moment');


var movies = [];


function updateDb(db, movies) {
  movies.forEach(function(m) {
    db.find({ title: m.title }, function (err, docs) {
      if (docs.length == 0) {
        // not found -> insert into db
        var doc = {
          title : m.title,
          at : new Date(),
        };
        db.insert(doc);
      }
    });
  }, this);
}

function checkMovies(db) {
  movies = [];
  var url = 'http://linz.megaplex.at/webservice/serviceext.asmx?wsdl';
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
                image : 'http://www.megaplex.at/content/' + d.FilmImg.split('/')[1],
                start : d.FilmStart
              };
            }
          }, this);
          // Create array from map.
          for (var key in movieMap) {
            movies.push(movieMap[key]);
          }
          //console.log(movies);
          updateDb(db, movies);
        }
        catch (e) {
          console.log(e);
        }
      });
    }
  });
}

module.exports = {
  init : function(db) {
    // run every hour 
    // */20 * * * * *",
    var cronJob = cron.job("0 0 */1 * * *", function() {
      checkMovies(db);
    });
    cronJob.start();
    checkMovies(db);
  },
  getMovies : function() {
    return movies;
  }
};