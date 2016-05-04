var fs = require('fs');
var path = require('path');
var express = require('express');


function findModules() {
  var modules = [];
  fs.readdirSync(__dirname).forEach(function(n) {
    var filePath = path.join(__dirname, n);
    if (fs.statSync(filePath).isDirectory()) {
      var name = path.basename(filePath);
      var m  = require(path.join(filePath, name));
      m.name = name;
      modules.push(m);
    }
  });
  //console.log(modules);
  return modules;
}
var modules = findModules();

function createRoutes() {
  var hugo = require('../hugo');
  var router = express.Router();
  // main
  router.get('/', function(req, res, next) {
    res.render('main', { hugo : hugo });
  });
  // modules
  modules.forEach(function(m) {
    if (m.isEnabled) {
      m.init(router);
    }
  });
  return router;
}


module.exports = {
  routes: function() {
    return createRoutes();
  },
  list: function() {
    return modules;
  },
};