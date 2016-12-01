'use strict';
var request = require('request');

const iconTable = {
  "01d": "wi-day-sunny",
  "02d": "wi-day-cloudy",
  "03d": "wi-cloudy",
  "04d": "wi-cloudy-windy",
  "09d": "wi-showers",
  "10d": "wi-rain",
  "11d": "wi-thunderstorm",
  "13d": "wi-snow",
  "50d": "wi-fog",
  "01n": "wi-night-clear",
  "02n": "wi-night-cloudy",
  "03n": "wi-night-cloudy",
  "04n": "wi-night-cloudy",
  "09n": "wi-night-showers",
  "10n": "wi-night-rain",
  "11n": "wi-night-thunderstorm",
  "13n": "wi-night-snow",
  "50n": "wi-night-alt-cloudy-windy"
};

function getWeather(callback) {
  request.get({
    url : 'http://api.openweathermap.org/data/2.5/weather?q=' + 
      this.config.location + '&appid=' + this.config.apiKey +
       "&units=metric&lang=de&ts=" + Date.now(),
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
        icon : iconTable[body.weather[0].icon]
      });
    }
  });  
}

module.exports = function Fetcher() {
  this.fetch = getWeather;
}
