'use strict';

module.exports = function Fetcher() {
  this.fetch = function(callback) {
    this.config.db.find({}, function(err, docs) {
      let drawings = [];
      docs.forEach(d => {
        drawings.push({
          id : d._id,
          name : d.name });
      });
      callback({ drawings: drawings });
    });
  },

  this.init = function() {
    let m = this.config;
    let db = m.db;
    this.router.get(m.url('code/:id'), function(req, res) {
      let id = req.params.id;
      db.findOne({ _id: id }, function (err, doc) {
        let lines = [];
        if (err) {
          console.log(err);
        }
        else {
          let dim = doc.data.length;
          for (var i = 0; i < dim; i++) {
            for (var j = 0; j < dim; j++) {
              let c = doc.data[i][dim - 1 - j];
              if (c.r != 0 || c.g != 0 || c.b != 0) {
                let code = 'world[' + i + '][' + j + '] = ';
                code += 'rgb(' + c.r + ', ' + c.g + ', ' + c.b + ');'; 
                lines.push(code);
              }
            }
          }
        }
        res.render(m.view('code'), { layout : false, code : lines});
      });
    });
    this.router.get(m.api('load/:id'),  function(req, res) {
      let id = req.params.id;
      db.findOne({ _id: id }, function (err, doc) {
        if (err) {
          console.log(err);
        }
        res.json(doc);
      });
    });
    this.router.post(m.api('save'), function(req, res) {
      let doc = {
        data : req.body.data,
        name : req.body.name
      };
      // Upserting a document
      db.update({ _id: req.body.id }, doc, { upsert: true }, function (err, numReplaced, upsert) {
        if (err) {
          console.log(err);
        }
        res.send('OK');
      });
    });
    this.router.get(m.api('delete/:id'),  function(req, res) {
      let id = req.params.id;
      db.remove({ _id: id }, {}, function (err, numRemoved) {
        if (err) {
          console.log(err);
        }
        res.send('OK');
      });
    });
  }
}
