var xbox = require('./xbox');

function initRoutes(helper)
{  
  helper.get('/', function(req, res, next) {
    res.render(helper.view(), helper.data());
  });  
}

module.exports = {
  isEnabled: true,
  init: function(router) {
    //xbox.init();
    initRoutes(require('../routingHelper')(router, __dirname));
  }
};