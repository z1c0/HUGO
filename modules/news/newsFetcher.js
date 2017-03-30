'use strict';
var request = require('request');
var Cursor = require('../cursor.js').Cursor;


function getHeadlines(callback) {
  let c = this.cursor;
  //console.log(c.current());

  request.get({
    url : 'https://newsapi.org/v1/articles?source=' + c.current() + '&sortBy=top&apiKey=' + this.config.apiKey,
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
      c.next();
    }
  });  
}


module.exports = function Fetcher() {
  this.init = function() {
    this.cursor = new Cursor(this.config.sources);
  }
  this.fetch = getHeadlines;
}
