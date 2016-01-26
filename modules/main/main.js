function initRoutes(helper)
{  
  helper.router.get('/', function(req, res, next) {
    res.render(helper.view(), { title : "H.U.G.O."});
  });
}


module.exports = {
  isEnabled: true,
  init: function(router) {
    initRoutes(require('../routingHelper')(router, __dirname));
  }
};