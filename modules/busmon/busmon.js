var busData = require('./busData');

function initRoutes(helper)
{  
  helper.get('/', function(req, res, next) {
    busData.fetch(function(o) {
      console.log(o);
      res.render(helper.view(), { title: 'Froschberg Bus Monitor', times: o, year : new Date().getFullYear() });
    });    
  });
  
  helper.get('/json', function(req, res, next) {
    busData.fetch(function(o) { res.send(o); });
  });
}


module.exports = {
  isEnabled: true,
  init: function(router) {    
    initRoutes(require('../routingHelper')(router, __dirname));
  }
};