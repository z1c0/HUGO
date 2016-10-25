"use strict"
var request = require('request');

let config = {};

const sources = [
  'spiegel-online',
  'focus',
  'bbc-sport',
  'hacker-news',
  'wired-de',
  'ars-technica',
]
let sourceIndex = 0;


function getHeadlines(callback) {
  console.log(sourceIndex);
  request.get({
    url : 'https://newsapi.org/v1/articles?source=' + sources[sourceIndex] + '&sortBy=top&apiKey=' + config.apiKey,
    json : true
  },
  function(err, httpResponse, body) {
    if (err) {
      // TODO
      console.log(err);
    }
    else {
      //console.log(body);
      callback(body);
      sourceIndex = (sourceIndex + 1) % sources.length;
    }
  });  
}


module.exports = {
  init : function(vm) {
    config = vm.config;
  },

  fetch : getHeadlines
}
