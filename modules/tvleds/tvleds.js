var xbox = require('./xbox');

function initRoutes(helper)
{  
  xbox.init(helper.data().db);
  
  helper.get('/');    
  
  helper.get('/diag', function(data) {
    data.xbox = xbox;
  });
}

module.exports = {
  isEnabled: true,
  init: function(router) {
    initRoutes(require('../routingHelper')(router, __dirname));
  }
};