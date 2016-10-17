"use strict"

function getHeadlines(callback) {
  callback({
    name : "foo",
  });
}


module.exports = {
  init : function(vm) {
  },

  fetch : getHeadlines
}
