"use strict"

$(function() {
  let viewModel = {
    temp : ko.observable(),
    name : ko.observable()
  };

  $(document).ready(function() {
    ko.applyBindings(viewModel);
    
    setInterval(function() {
      $.getJSON("api", function(data) {
        viewModel.temp(data.temp);
        viewModel.name(data.name);
      });
    }, 2000);
  });
});
