var schedule = require('./schedule');

function initRoutes(helper) {
  helper.get('/', function(req, res, next) {
    var data = helper.data();
    schedule.getOVs(data.db, function(o) {
      //console.log(o);
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