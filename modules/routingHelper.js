var path = require('path'),
    hugo = require('../hugo'),
    db = require('../db/db');

function getViewPath(name)
{
  return '../modules/' + name + '/' + name;
}


module.exports = function RoutingHelper(router, dirName) {
  var _router = router,
      _name = path.basename(dirName);
      
  return {
    router : _router,
    url : function() {
      return '/' + _name;
    },
    
    view : function() {
      return getViewPath(_name);
    },
    
    data : function() {
      return {
        db : db.get(_name),
        hugo : hugo,
        title : hugo.title,
      };
    },    
    
    get : function(path, f) {
      var fRender = f;
      var view = this.view();
      var data = this.data();
      if (!fRender) {
        fRender = function(req, res, next) {
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
