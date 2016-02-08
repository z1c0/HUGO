var schedule = require('./schedule');

function initRoutes(helper) {
  var data = helper.data();
  
  schedule.init(data.db);
  
  helper.get('/', function(data) {
    data.movies = schedule.getMovies();
  });
}

module.exports = {
  isEnabled: true,
  init: function(router) {
    initRoutes(require('../routingHelper')(router, __dirname));
  }
};