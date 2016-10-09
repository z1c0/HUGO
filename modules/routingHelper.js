var path = require('path'),
    hugo = require('../hugo'),
    db = require('../db/db')


function getViewPath(name) {
  return '../modules/' + name + '/' + name;
}

function performGet(router, url, view, data, fetch, filter, isJson) {
  var fRender = function(req, res) {
    
    var f = fetch;
    if (!f) {
      f = function(o) {
        o(data);
      }
    }
    f(function(o) {
      if (filter) {
        o = filter(o);
      }
      console.log(o);
      if (isJson) {
        res.json(o);
      }
      else {
        res.render(view, o);
      }
    });
  };
  router.get(url, fRender);
}

module.exports = function routingHelper(router, hugoModule) {
  var _router = router,
      _name = hugoModule.name;
      
  return {
    router : _router,
    url : function() {
      return '/' + _name;
    },
    
    view : function() {
      return getViewPath(_name);
    },
    
    data : function() {
      var data = {
        config : hugoModule.config,
        hugo : hugo,
        title : hugo.title,
      };
      if (hugoModule.config['useDB']) {
        data.db = db.get(_name);
      }
      if (hugoModule.config['fullscreen']) {
        data.layout = 'layoutfullscreen.hbs';
      }
      return data;
    },
    
    get : function(path, fetcher, filter) {
      performGet(router, this.url() + path, this.view(), this.data(), fetcher, filter, false);
    },

    json : function(path, fetcher, filter) {
      performGet(router, this.url() + path, this.view(), this.data(), fetcher, filter, true);
    }
  };  
};
