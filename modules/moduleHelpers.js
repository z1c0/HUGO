var path = require('path');

function getViewPath(name)
{
  return '../modules/' + name + '/' + name;
}

function initRoutes(router, moduleName)
{
  router.get('/' + moduleName + '/', function(req, res, next) {
    res.render(getViewPath(moduleName), {});
  });
}



module.exports = {
  initRoutes: function(router, dirName) {
    initRoutes(router, path.basename(dirName));
  },
  getViewPath: function(name) {
    return getViewPath(name);
  }
};