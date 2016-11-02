"use strict"
var moment = require('moment');

function initRoutes(helper) { 
  helper.get('/');
}

module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  },
  icon : 'fa-calendar-check-o',
  displayName : 'calendar',
  updateInterval : moment.duration(1, 'hours').asMilliseconds()
};