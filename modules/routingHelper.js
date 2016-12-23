'use strict';

function init(router, hugoModule) {
  let fRender = function(req, res) {
    res.render(hugoModule.view(), hugoModule);
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
      router.get(hugoModule.api(), fRenderJson);

      fRender = function(req, res) {
        fetcher.fetch(function(data) {
          hugoModule.fetched = data;
          res.render(hugoModule.view(), hugoModule);
        });
      };
    }
    else {
      // "init" was called on fetcher ... OK
      // But we remove it from the module again, since there is no actual "fetch" function.
      hugoModule.fetcher = null;
    }
  }

  router.get(hugoModule.url(), fRender);
};


module.exports = {
  init : init
}