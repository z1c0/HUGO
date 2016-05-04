var http = require('http');
var parseString = require('xml2js').parseString;


var doRequest = function (callback, urlParams, renderCallback) {
  var options = {
    host: 'www.linzag.at',
    path: '/static/XML_DM_REQUEST?'
  };
  options.path += urlParams;
  var req = http.request(options);
  req.on('response', function (res) {
    var data = '';
    // concat chunks
    res.on('data', function (chunk) { data += chunk });  
    // when the response has finished
    res.on('end', function () {          
      //console log(data);
      parseString(data, function (err, result) {
        // fire callback      
        callback(result, renderCallback);
      });
    });
  });
  req.end();
}

function filter(line, direction, minutes) {
  return (minutes >= 0 && minutes < 100) &&
    ((line == "27" && direction.indexOf("Fernheizkraft") == 0) ||
      (line == "27" && direction.indexOf("Lederergasse") == 0) ||
      (line == "27" && direction.indexOf("Hafen") == 0) ||
      (line == "46" && direction.indexOf("Hafen") == 0) ||
      (line == "26" && direction.indexOf("St. Margarethen") == 0));
}

function getTimes(result, renderCallback) {
  var departures = result.itdRequest.itdDepartureMonitorRequest[0].itdDepartureList[0].itdDeparture;
  //console.log(departures);
  var nextDepartures = {};
  for (var i in departures) {
    var d = departures[i];
    var lineNr = d.itdServingLine[0].$.number;
    var direction = d.itdServingLine[0].$.direction;
    var minutes = d.$.countdown - 1;
    // Remove "Linz " prefix.
    if (direction.indexOf("Linz ") == 0) {
      direction = direction.substr(5);
    }
    //console.log("Linie " + lineNr + " (" + direction + "): " + minutes + " min.");
    if (filter(lineNr, direction, minutes)) {
      if (lineNr in nextDepartures && nextDepartures[lineNr].in < minutes) {
        minutes = nextDepartures[lineNr].in;
        direction = nextDepartures[lineNr].to;
      }
      nextDepartures[lineNr] = { to: direction, in: minutes };
    }
  }
  
  var departureList = [];
  for (var d in nextDepartures) {
    departureList.push({ l: d, to: nextDepartures[d].to, in: nextDepartures[d].in }); 
  }
  //console.log(nextDepartures);
  renderCallback(departureList);
}

function getLines(result, renderCallback) {
  try {
    var sessionId = result.itdRequest.$.sessionID;
    var requestId = result.itdRequest.itdDepartureMonitorRequest[0].$.requestID;
    var lines = result.itdRequest.itdDepartureMonitorRequest[0].itdServingLines[0].itdServingLine; 
    //console.log(sessionId);
    //console.log(requestId);
    //console.log(lines.length);
    var urlParams = "sessionID=" + sessionId + "&requestID=" + requestId;
    for (var i in lines) {
      var line = lines[i].$
      //console.log("[" + line.index + "] " + line.number + ": " + line.direction);
      urlParams += ("&dmLineSelection=" + line.index);
    }
    doRequest(getTimes, urlParams, renderCallback);
  } catch (ex) {
    console.log(ex);
  }
}

module.exports = {
  fetch: function (f) {
    doRequest(getLines, "sessionID=0&type_dm=any&name_dm=60500560", f);
  }
};
