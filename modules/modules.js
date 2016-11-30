var fs = require('fs');
var path = require('path');
var express = require('express');
var autoNav = require('./autoNav');


function loadModules() {
  var modules = [];  
  var config = require('./modules.config.json');
  //console.log(config);

  for (var name in config) {
    var c = config[name];
    if (c.enabled) {
      var filePath = path.join(__dirname, name);
      if (fs.statSync(filePath).isDirectory()) {
        var m = require(path.join(filePath, name));
        m.name = name;
        m.config = c;
        m.getRoute = function() { return this.name; };
        modules.push(m);
      }
    }
  }
  return modules;
}
var modules = loadModules();

function createRoutes() {
  var hugo = require('../hugo');
  var router = express.Router();
  // main
  router.get('/', function(req, res) {
    res.render('main', { hugo : hugo });
  });
  router.get('/status', function(req, res) {
    res.render('status', { layout : 'layoutDetails.hbs', hugo : hugo });
  });
  autoNav.init(router, modules);
  // modules
  modules.forEach(function(m) {
    m.init(router);
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