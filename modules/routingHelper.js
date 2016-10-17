var path = require('path'),
    hugo = require('../hugo'),
    db = require('../db/db')


function getViewPath(name) {
  return '../modules/' + name + '/' + name;
}

function ensureProperty(object, propertyName, defaultValue)
{
  if (!object.hasOwnProperty(propertyName)) {
    object[propertyName] = defaultValue;
  }
}

module.exports = function routingHelper(router, hugoModule) {
  var _router = router,
      _name = hugoModule.name;
      
  if (!hugoModule.displayName) {
    hugoModule.displayName = hugoModule.name;
  }
  return {
    router : _router,

    url : function() {
      return '/' + _name;
    },
    
    view : function() {
      return getViewPath(_name);
    },
    
    viewModel : function() {
      var viewModel = {
        config : hugoModule.config,
        hugo : hugo,
        title : hugo.title,
      };
      if (hugoModule.config['useDB']) {
        viewModel.db = db.get(_name);
      }
      if (hugoModule.config['fullscreen']) {
        viewModel.layout = 'layoutfullscreen.hbs';
      }
      return viewModel;
    },
    
    get : function(path, options) {
      options = options || {};
      ensureProperty(options, "useFetcher", true);
      ensureProperty(options, "apiPath", "api");
      //console.log(options);

      let fetcher = null;
      if (hugoModule.fetcher) {
        fetcher = hugoModule.fetcher;
      }

      const view = this.view();
      const viewModel = this.viewModel();
      let fRender;

      if (options.useFetcher) {
        if (!fetcher) {
          fetcher = require("./" + _name + "/" + _name + "Fetcher");
        }
        if (fetcher.init) {
          fetcher.init(viewModel);
        }

        var fRenderJson = function(req, res) {
          fetcher.fetch(function(data) {
            res.json(data);
          });
        };
        router.get(this.url() + path + options.apiPath, fRenderJson);

        fRender = function(req, res) {
          fetcher.fetch(function(data) {
            viewModel.fetched = data;
            res.render(view, viewModel);
          });
        };
      }
      else {
        fRender = function(req, res) {
          res.render(view, viewModel);
        }
      }

      router.get(this.url() + path, fRender);
    }
  };
};
