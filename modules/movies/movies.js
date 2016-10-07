var schedule = require('./schedule');

function initRoutes(helper) {
  var data = helper.data();
  
  schedule.init(data);
  
  helper.get('/', function(data) {
    data.movies = schedule.getMovies();
  });
}

module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  }
};