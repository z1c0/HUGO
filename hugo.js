var allModules = require('./modules/modules');
var moment = require('moment');
var start = moment();

module.exports = {
  title: "H.U.G.O.",
  modules: allModules,
  uptime: function() {
    return  moment.duration(moment() - start).humanize();
  },
  hostname: function() {
    return require('os').hostname();
  },
  isProduction: function() {
    return this.hostname() == 'hugopi';
  }
};