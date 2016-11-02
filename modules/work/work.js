"use strict"

function initRoutes(helper) { 
  helper.get('/');
}

module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  },
  icon : 'fa-tasks',
  updateInterval : 1000 * 10
};