var helpers = require('../moduleHelpers');
var xbox = require('./xbox');

module.exports = {
  isEnabled: false,
  init: function(router) {
    xbox.init();
    helpers.initRoutes(router, __dirname);
  }
};