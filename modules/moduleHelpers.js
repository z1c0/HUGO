var path = require('path');

function initRoutes(router, dirName)
{
  router.get('/' + dirName + '/', function(req, res, next) {
    res.render('../modules/' + dirName + '/' + dirName, {});
  });
}


module.exports = {
  initRoutes: function(router, dirName) {
    initRoutes(router, path.basename(dirName));
  }
};