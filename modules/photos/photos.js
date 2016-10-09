"use strict"

var cron = require('cron');
var fetcher = require('./photoFetcher');


function initRoutes(helper) {
  fetcher.init(helper.data().config);
  
  var cronJob = cron.job("0 0 */2 * * *", function() {
    fetcher.fetchPhotos();
  });
  cronJob.start();
  fetcher.fetchPhotos();

  helper.get('/', fetcher.getPhotos);
}

module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  }
};