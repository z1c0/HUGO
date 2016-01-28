var busData = require('./busData');

function initRoutes(helper)
{  
  helper.get('/', function(req, res, next) {
    busData.fetch(function(o) {
      //console.log(o);
      var data = helper.data();
      data.times = o;
      res.render(helper.view(), data);
    });    
  });
  
  helper.get('/json', function(req, res, next) {
    busData.fetch(function(o) { res.json(o); });
  });
}


module.exports = {
  isEnabled: true,
  init: function(router) {    
    initRoutes(require('../routingHelper')(router, __dirname));
  }
};