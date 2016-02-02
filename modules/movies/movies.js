var schedule = require('./schedule');

function initRoutes(helper) {
  helper.get('/', function(req, res, next) {
    schedule.getOVs(function(o) {
      console.log(o);
      var data = helper.data();
      data.movies = o;
      res.render(helper.view(), data);
    });    
  });
}

module.exports = {
  isEnabled: true,
  init: function(router) {
    //schedule.init();
    initRoutes(require('../routingHelper')(router, __dirname));
  }
};