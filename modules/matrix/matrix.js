function initRoutes(helper) {
  helper.get('/');
}

module.exports = {
  init: function(router) {    
    initRoutes(require('../routingHelper')(router, __dirname));
  }
};