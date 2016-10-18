"use strict"

var request = require('request');

function sendNavigationCommand(to) {
  request.get({
    url : 'http://localhost:4000/navigate',
    json : true
  },
  function(err, httpResponse, body) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(body);
    }
  });
}


sendNavigationCommand('foo');