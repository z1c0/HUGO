"use strict"

var schedule = require('./schedule');

function initRoutes(helper) { 
  helper.get('/');
}

module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  },
  fetcher : schedule
};