'use strict';

var path = require('path');
var Datastore = require('nedb');

var dbs = {};

module.exports = {
  get: function(name) {
    if (!dbs[name]) {
      console.log('Creating DB: ' + name);
      let store = new Datastore({ filename: path.join(__dirname, "store", name + '.json'), autoload: true });
      dbs[name] = store;
    }
    return dbs[name];
  }
};