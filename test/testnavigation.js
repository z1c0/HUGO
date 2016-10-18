"use strict"

var request = require('request');

function sendNavigationCommand(command) {
  console.log(command);
  request.post({
    url : 'http://localhost:4000/navigation',
    json : command
  },
  function(err, httpResponse, body) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(httpResponse.statusCode + ' ' + httpResponse.statusMessage);
    }
  });
}

let command = {
  to : process.argv[2]
};
if (!command.to) {
  command.to = '/';
}
sendNavigationCommand(command);
