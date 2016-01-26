function initRoutes(helper)
{
  var f = function(req, res, next) {
    res.render(helper.view(), helper.data());
  }
  helper.get('/', f);  
  helper.router.get('/', f);
}


module.exports = {
  isEnabled: true,
  init: function(router) {
    initRoutes(require('../routingHelper')(router, __dirname));
  }
};