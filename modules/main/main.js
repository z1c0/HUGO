var helpers = require('../moduleHelpers');

function initRoutes(router)
{
  router.get('/', function(req, res, next) {
    res.render(helpers.getViewPath('main'), { title : "H.U.G.O."});
  });
}


module.exports = {
  isEnabled: true,
  init: function(router) {
    initRoutes(router);
  }
};