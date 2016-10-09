var schedule = require('./schedule');

function initRoutes(helper) {
  var data = helper.data();
  
  schedule.init(data);
  
  helper.get('/',schedule.getMovies);
}

module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  }
};