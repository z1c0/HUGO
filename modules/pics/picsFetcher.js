"use strict";

var cron = require('cron');
var request = require('request');
var fs = require('fs');
var path = require('path');

/*
const redirectURI  = 'http://localhost';
const browserUrl = 
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  "scope=https://picasaweb.google.com/data" + "&" +
  "redirect_uri=" + redirectURI + "&" +
  "response_type=code&" +
  "client_id=" + this.config.clientId;
*/

const postUrl =  "https://www.googleapis.com/oauth2/v4/token";

function retrieveTokens() {
  const theCode = "4/bPO_fjOJ1RkccDs4xFhfkn5_-JVWnwAWolJtuqrD4FI#";
  request.post({
    url : postUrl,
    form : { 
      code : theCode,
      client_id : this.config.clientId,
      client_secret : this.config.clientSecret,
      redirect_uri : redirectURI,
      grant_type : "authorization_code" }
    }, 
    function(err, httpResponse, body) {
      console.log(body);
    }
  );
}

function refreshToken(config, callback) {
  request.post({
    url : postUrl,
    form : { 
      refresh_token : config.refreshToken,
      client_id : config.clientId,
      client_secret : config.clientSecret,
      grant_type : "refresh_token"
    },
    json : true 
  },
  function(err, httpResponse, body) {
    if (err) {
      // TODO!
      console.log(err);
    }
    else {
      callback(config, body.access_token);
    }
  });
}

function parseEntry(entry)  {
  if (entry.content.type === 'image/jpeg') {
    return {
      name : entry.title["$t"],
      url : entry.content.src
    }
  }
  return null;
}

function updatePhotos(config, token) {
  //console.log(token);
  request({
    url: "https://picasaweb.google.com/data/feed/api/user/default/albumid/" + config.albumId,
    headers: {
      'GData-Version': '2'
    },
    qs: {
      access_token : token,
      kind : "photo",
      alt : "json",
      //"max-results" : 3,
      fields : "entry(title, content)"
    },
    method: 'GET',
    json : true
  }, function(error, response, body){
    if (error) {
      console.log(error);
    }
    else {
      //console.log(body);
      var photos = body.feed.entry.map(
        entry => parseEntry(entry)
      );
      for (var i in photos) {
        fetchPhoto(config, photos[i]);
      }
    }
  });
}

function fileExists(filePath) {
  try {
    fs.statSync(filePath);
  } catch(err) {
    if (err.code == 'ENOENT') {
      return false;
    }
  }
  return true;
};

function fetchPhoto(config, photo) {
  if (photo) {
    var fileName = path.join(config.imageDir, photo.name);
    if (!fileExists(fileName)) {
      console.log("GET: " + photo.url);
      request
        .get(photo.url + "?imgmax=912")
        .on('error', function(err) {
          console.log(err)
        })
        .pipe(fs.createWriteStream(fileName));
    }
  }
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

function getDownloadedPhotos(callback) {
  let photos = [];
  var files = fs.readdirSync(this.config.imageDir) 
  for (var i in files) {
    // TODO: jpeg filter
    photos.push(files[i]); 
  }
  shuffle(photos);
  callback(photos);
}

function checkForNewPhotos(config) {
  refreshToken(config, updatePhotos);
}

//retrieveTokens();


module.exports = function Fetcher() {
  this.init = function() {
    var cronJob = cron.job("0 0 */2 * * *", function() {
      checkForNewPhotos(this.config);
    });
    cronJob.start();
    checkForNewPhotos(this.config);
  }
  
  this.fetch = getDownloadedPhotos;
}

