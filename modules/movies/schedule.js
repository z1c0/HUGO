var moment = require('moment');

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

function getMoviesOV(db, callback) {
  var soap = require('soap');
  var url = 'http://linz.megaplex.at/webservice/serviceext.asmx?wsdl';
  soap.createClient(url, function(err, client) {
    var from = moment().format('YYYY-MM-DD');
    var to = moment().add(2, 'w').format('YYYY-MM-DD');
    console.log(from);
    console.log(to);    
    var args = { FromDate : from, ToDate: to, SQLFilter : '', SQLSort : '' };
    client.GetSchedule(args, function(err, result) {
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
      var movies = [];
      for (var key in movieMap) {
        movies.push(movieMap[key]);
      }
      //console.log(movies);
      updateDb(db, movies);
      callback(movies);
    });
  });
}

module.exports = {
  getOVs: function(db, callback) {
    getMoviesOV(db, callback);
  }
};