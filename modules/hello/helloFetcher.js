'use strict';
var info = require('./timeOfDayInfo');
var request = require('request');

function fetchTimeOfDayStuff(callback) {
  const data = info.get();
  //console.log(data);
  const giphyUrl = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=y&tag=' + data.tag;
  request.get({
    url : giphyUrl,
    json : true
  },
  function(err, httpResponse, body) {
    if (err) {
      // TODO
      console.log(err);
    }
    else {
      //console.log(body);
      data.gif = {
        url : body.data.fixed_width_downsampled_url,
        width : body.data.fixed_width_downsampled_width,
        height : body.data.fixed_width_downsampled_height
      }
      callback(data);
    }
  });
}


module.exports = {
  fetch : fetchTimeOfDayStuff
};
