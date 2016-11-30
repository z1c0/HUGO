"use strict"

var request = require('request');

function sendNavigationCommand(command) {
  const url =  'http://' + process.argv[2] + '/navigation';
  console.log('url: ' + url);
  console.log(command);
  request.post({
    url : url,
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

let cmd = process.argv[3];
let data = process.argv[4];  

let msg = {
  cmd : cmd,
  data : data
};
sendNavigationCommand(msg);
