'use strict';

function init(router, hugoModule) {
  let url = '/' + hugoModule.route;
  let view = '../modules/' + hugoModule.module + '/' + hugoModule.module;
  let fRender;
  if (hugoModule.fetcher !== '') {
    let Fetcher = require('./' + hugoModule.module + '/' + hugoModule.fetcher);
    let fetcher = new Fetcher();
    fetcher.config = hugoModule;
    if (fetcher.init) {
      fetcher.init();
    }

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
  else {
    fRender = function(req, res) {
      res.render(view, hugoModule);
    }
  }

  router.get(url, fRender);
};


module.exports = {
  init : init
}