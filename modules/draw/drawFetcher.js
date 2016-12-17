'use strict';

module.exports = function Fetcher() {
  this.fetch = function(callback) {
    if (this.config.db) {
      this.config.db.find({}, function(err, docs) {
        let ids = [];
        docs.forEach(d => {
          ids.push({ 
            world : d.world,
            id : d._id });
        });
        callback(ids);
      });
    }
  },

  this.init = function() {
    let db = this.config.db;
    this.router.get('/matrix/code', function(req, res) {
      if (db) {
        db.find({}, function(err, docs) {
          let code = '';
          if (docs.length > 0) {
            let dim = docs[0].world.length;
            for (var i = 0; i < dim; i++) {
              for (var j = 0; j < dim; j++) {
                let c = docs[0].world[i][dim - 1 - j];
                if (c != 'rgb(0,0,0)') {
                  code += 'world[' + i + '][' + j + '] = ';
                  code += c; 
                  code += ';\r\n';
                }
              }
            }
          }
          res.send(code);
        });
      }
    });
    this.router.post('/matrix/api', function(req, res) {
      if (db) {
        // TODO: now, only one doc is stored.
        // Removing all documents with the 'match-all' query
        db.remove({}, { multi: true }, function (err, numRemoved) {
          if (err) {
            console.log(err);
          }
          else {
            let doc = {
              world : req.body,
              at : new Date(),
            };
            db.insert(doc);
            res.send('OK');
          }
        });
      }
    });
  }
}
