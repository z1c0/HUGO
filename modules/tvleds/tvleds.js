var xbox = require('./xbox');

function initRoutes(helper) {  
  if (helper.data().hugo.isProduction()) {
    xbox.init(helper.data().db);
  }
  
  helper.get('/');
  
  helper.get('/diag', null, function(data) {
    data.xbox = xbox;
  });
}

module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  },
  icon : 'fa-tv'
};