"use strict"
var moment = require('moment');

function initRoutes(helper) {
  helper.get('/');
}

module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  },
  icon : 'fa-user-circle',
  updateInterval : moment.duration(20, 'seconds').asMilliseconds()
};