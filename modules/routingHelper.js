'use strict';

function init(router, hugoModule) {
  let url = '/' + hugoModule.route;
  let view = '../modules/' + hugoModule.module + '/' + hugoModule.module;
  let fRender = function(req, res) {
    res.render(view, hugoModule);
  }
  if (hugoModule.fetcher !== '') {
    let Fetcher = require('./' + hugoModule.module + '/' + hugoModule.fetcher);
    let fetcher = new Fetcher();
    fetcher.config = hugoModule;
    fetcher.router = router;
    if (fetcher.init) {
      fetcher.init();
    }
    if (fetcher.fetch) {
      var fRenderJson = function(req, res) {
        fetcher.fetch(function(data) {
          res.json(data);
        });
      };
      router.get(url + '/api', fRenderJson);

      fRender = function(req, res) {
        fetcher.fetch(function(data) {
          hugoModule.fetched = data;
          res.render(view, hugoModule);
        });
      };
    }
  }

  router.get(url, fRender);
};


module.exports = {
  init : init
}