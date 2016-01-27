function initRoutes(helper)
{  
  helper.get('/', function(req, res, next) {
    res.render(helper.view(), helper.data());
  });  
}

module.exports = {
  isEnabled: true,
  init: function(router) {
    initRoutes(require('../routingHelper')(router, __dirname));
  }
};