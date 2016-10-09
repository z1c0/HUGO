"use strict"

function getWeather(callback) {
  callback({ "foo" : 2 });
}

module.exports = {
  init : function(cfg) {
    //config = cfg;
  },

  getWeather : getWeather
}
