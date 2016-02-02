function getMoviesOV(callback) {
  var soap = require('soap');
  var url = 'http://linz.megaplex.at/webservice/serviceext.asmx?wsdl';
  soap.createClient(url, function(err, client) {
    var dateTo = new Date();
    dateTo.setFullYear(dateTo.getFullYear() + 1);
    console.log(dateTo);
    var args = { FromDate : "2016-02-01", ToDate: "2017-02-01", SQLFilter : '', SQLSort : '' };
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
      var movies = [];
      for (var key in movieMap) {
        movies.push(movieMap[key]);
      }
      //console.log(movies);
      callback(movies);
    });
  });
}

module.exports = {
  getOVs: function(callback) {
    getMoviesOV(callback);
  }
};