var helpers = require('../moduleHelpers');

module.exports = {
  isEnabled: true,
  init: function(router) {
    helpers.initRoutes(router, __dirname);
  }
};