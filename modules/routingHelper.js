var path = require('path'),
    hugo = require('../hugo'),
    db = require('../db/db'),
    settings = require('../settings');


function getViewPath(name) {
  return '../modules/' + name + '/' + name;
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
        config : settings,
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
    
    get : function(path, f) {
      var fRender = f;
      var view = this.view();
      var data = this.data();
      if (!fRender) {
        fRender = function(req, res, next) {
          //console.log(data);
          res.render(view, data);
        };
      }
      else if (fRender.length == 1) {
        fRender = function(req, res, next) {
          f(data);
          res.render(view, data);
        };        
      }        
      router.get(this.url() + path, fRender);
    },
  };  
};
