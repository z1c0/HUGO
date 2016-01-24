var express = require('express');
var router = express.Router();
var path = require('path');
var Datastore = require('nedb')


var db = new Datastore({ filename: path.join(__dirname, 'hugo.datafile'), autoload: true });




/* GET home page. */
router.get('/', function(req, res, next) {


var doc = { hello: 'world'
               , n: 5
               , today: new Date()
               , nedbIsAwesome: true
               , notthere: null
               , notToBeSaved: undefined  // Will not be saved
               , fruits: [ 'apple', 'orange', 'pear' ]
               , infos: { name: 'nedb' }
               };

db.insert(doc, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
  console.log(newDoc);
});

  res.render('index', { title: 'H.U.G.O' });
});

module.exports = router;
