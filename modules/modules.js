'use strict';
var fs = require('fs');
var path = require('path');
var express = require('express');
var db = require('../db/db');
var routingHelper = require('./routingHelper');
var autoNav = require('./autoNav');


function ensureProperty(object, propertyName, defaultValue)
{
  if (!object.hasOwnProperty(propertyName)) {
    object[propertyName] = defaultValue;
  }
  return object[propertyName];
}



function loadModules() {
  var modules = [];  
  var config = require('./modules.config.json');
  //console.log(config);

  for (var name in config) {
    let m = config[name];
    m.displayName = name;
    if (ensureProperty(m, 'enabled', true)) {
      ensureProperty(m, 'module', name);
      ensureProperty(m, 'route', name.toLowerCase());
      ensureProperty(m, 'updateInterval',  1000 * 60);
      ensureProperty(m, 'fetcher', m.module + 'Fetcher');
      ensureProperty(m, 'useDb', false);

      if (m.useDb) {
        m.db = db.get(name);
      }
      //console.log(m);
      modules.push(m);
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
    routingHelper.init(router, m);
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