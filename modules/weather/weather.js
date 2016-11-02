"use strict"

function initRoutes(helper) { 
  helper.get('/');
}

module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  },
  icon : 'fa-thermometer-half',
  updateInterval : 1000 * 60 * 5 
};