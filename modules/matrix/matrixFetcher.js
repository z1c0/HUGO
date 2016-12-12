'use strict';

module.exports = function Fetcher() {
  this.init = function() {
    let db = this.config.db;
    this.router.post('/matrix/api', function(req, res) {
      if (db) {
        let doc = {
          world : req.body,
          at : new Date(),
        };
        db.insert(doc);
      }
      res.send('OK');
    });
  }
}
