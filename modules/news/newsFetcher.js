"use strict"
var request = require('request');

let config = {};


function getHeadlines(callback) {
  request.get({
    url : 'https://newsapi.org/v1/articles?source=spiegel-online&sortBy=top&apiKey=' + config.apiKey,
    json : true
  },
  function(err, httpResponse, body) {
    if (err) {
      // TODO
      console.log(err);
    }
    else {
      console.log(body);
      callback(body);
    }
  });
}


module.exports = {
  init : function(vm) {
    config = vm.config;
  },

  fetch : getHeadlines
}
