var xbox = require('./xbox');

module.exports = {
  isEnabled: false,
  init: function(router) {
    xbox.init();
  }
};