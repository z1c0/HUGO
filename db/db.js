var path = require('path');
var Datastore = require('nedb');

var dbs = {};

module.exports = {
  get: function(name) {
    if (!dbs[name]) {      
      console.log("Creating DB: " + name);
      dbs[name] = new Datastore({ filename: path.join(__dirname, "store", name + '.json'), autoload: true });
    }
    return dbs[name];
  }
};