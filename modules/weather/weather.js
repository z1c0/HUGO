"use strict"
var fetcher = require('./weatherFetcher');

function initRoutes(helper) {
  fetcher.init(helper.data().config);
  
  helper.get('/', fetcher.getWeather);
}

module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  }
};