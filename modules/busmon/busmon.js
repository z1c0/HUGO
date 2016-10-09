var busData = require('./busData');

function initRoutes(helper) {
  helper.get('/', busData.fetch);

  helper.json('/json', busData.fetch, function(data) {
    return data.fetched;
  });
}


module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  }
};