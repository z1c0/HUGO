'use strict';
const cheerio = require('cheerio');
var request = require('request');

const FROM = 'Gallneukirchen';
const TO = 'Linz, Hinsenkampplatz';
const URL = 'http://fahrplan.oebb.at/bin/query.exe/dn?start=1&S=' +
  encodeURIComponent(FROM) +
  '&Z=' +
  encodeURIComponent(TO);


function parseResponsePage(body) {
  const $ = cheerio.load(body);
  let i = 0;
  let times = [];

  while (true)
  {
    let row = $('#trOverviewC0-' + i++);
    if (row.length === 0) {
      break;
    }

    let from = row.find('.station div').eq(0).text().trim();
    let to = row.find('.station div').eq(2).text().trim();
    let departs = row.find('.planed').eq(0).html().split('<br>')[0].trim().substr(0, 5);
    let arrives = row.find('.planed').eq(0).html().split('<br>')[1].trim().substr(0, 5);
    let duration = row.find('.duration').text().trim();
    let line = row.find('.product').first().attr('title').trim();

    times.push({
      from : from,
      to : to,
      departs : departs,
      arrives : arrives,
      duration : duration,
      line : line
    });
  }

  return { times : times };
}

function getTimeTable(callback) {
  //console.log(URL);
  request.get({
    url : URL
  },
  function(err, httpResponse, body) {
    if (err) {
      // TODO
      console.log(err);
    }
    else {
      var result = parseResponsePage(body);
      console.log(result);
      callback(result);
    }
  });
}


module.exports = function Fetcher() {
  this.init = function() {
    //this.cursor = new Cursor(this.config.sources);
  }
  this.fetch = getTimeTable;
}
