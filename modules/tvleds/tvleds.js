var helpers = require('../moduleHelpers');
var xbox = require('./xbox');

module.exports = {
  init: function(router) {
    xbox.init();
    helpers.initRoutes(router, __dirname);
  }
};