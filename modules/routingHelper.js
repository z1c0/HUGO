var path = require('path'),
    hugo = require('../hugo');

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
    get : function(path, f) {
      router.get(this.url() + path, f);
    },
    data : function() {
      return hugo;
    }
  };  
};
