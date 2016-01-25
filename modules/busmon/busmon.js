var helpers = require('../moduleHelpers');
var busData = require('./busData');

function initRoutes(router)
{
  router.get('/busmon/json', function(req, res, next) {
    busData.fetch(function(o) { res.send(o); });
  });
}


module.exports = {
  isEnabled: true,
  init: function(router) {
    helpers.initRoutes(router, __dirname);
    initRoutes(router);
  }
};