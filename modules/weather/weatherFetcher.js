"use strict"

function getWeather() {
  return "foo";
}

module.exports = {
  init : function(cfg) {
    //config = cfg;
  },

  getWeather : getWeather
}
