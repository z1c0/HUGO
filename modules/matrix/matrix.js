function initRoutes(helper) {
  helper.get('/');
}

module.exports = {
  isEnabled: true,
  init: function(router) {    
    initRoutes(require('../routingHelper')(router, __dirname));
  }
};