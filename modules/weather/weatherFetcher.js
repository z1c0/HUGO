"use strict"
var request = require('request');

let config = {};

function getWeather(callback) {
  request.get({
    url : "http://api.openweathermap.org/data/2.5/weather?q=Linz,AT&appid=" + config.apiKey + "&units=metric&lang=de",
    json : true 
  },
  function(err, httpResponse, body) {
    if (err) {
      // TODO
      console.log(err);
    }
    else {
      //console.log(body);
      callback({
        name : body.name,
        temp : Math.round(body.main.temp),
        description : body.weather[0].description,
        image : "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png"

      });
    }
  });  
}

module.exports = {
  init : function(cfg) {
    config = cfg;
  },

  getWeather : getWeather
}
