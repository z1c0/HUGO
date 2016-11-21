'use strict';
var tvChecker = require('./tvCheckerJob.js');

function initRoutes(helper) {
  tvChecker.init(helper.viewModel());
  helper.get('/', { useFetcher : false });  
}

/*
var request = require('request');
app.get('/', function(req,res) {
  //modify the url in any way you want
  var newurl = 'http://google.com/';
  request(newurl).pipe(res);
});
*/

module.exports = {
  init: function(router) {
    initRoutes(require('../routingHelper')(router, this));
  },
  icon : 'fa-lightbulb-o',
  displayName : 'lights'
};