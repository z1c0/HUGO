var path = require('path');
var Datastore = require('nedb');

var db = new Datastore({ filename: path.join(__dirname, 'hugo.datafile'), autoload: true });
