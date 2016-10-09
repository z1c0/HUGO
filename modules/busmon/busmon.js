var busData = require('./busData');

function initRoutes(helper) {
  helper.get('/', busData.fetch, function(o) {
    var d = helper.data();
    d.times = o;
    return d; 
  });

  helper.json('/json', busData.fetch);
}


module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  }
};