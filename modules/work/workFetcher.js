'use strict';
var request = require('request');

function getWorkData(callback) {
  request.get({
    url : "http://relayworkdata.azurewebsites.net/data",
    json : true
  },
  function(err, httpResponse, body) {
    if (err) {
      // TODO
      console.log(err);
    }
    else {
      callback(body);
    }
  });  
}

module.exports = function Fetcher() {
  this.fetch = getWorkData;
}
