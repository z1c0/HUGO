function initRoutes(helper) {
  helper.get('/', { useFetcher : false });
}

module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  }
};