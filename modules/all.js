var fs = require('fs');
var path = require('path');
var express = require('express');


function walkModules(currentDirPath) {
  var router = express.Router();
  fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = path.join(currentDirPath, name);
    if (fs.statSync(filePath).isDirectory()) {
      var module = require(path.join(filePath, path.basename(filePath)));
      module.init(router);
    }
  });
  return router;
}

module.exports = {
  routes: function() {
    return walkModules(__dirname);
  }
};