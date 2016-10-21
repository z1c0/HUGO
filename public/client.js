"use strict"

function setupDataBinding(name, json, updateInterval) {
  $(document).ready(function () {
    const viewModel = ko.mapping.fromJS(json);
    ko.applyBindings(viewModel);
    setInterval(function () {
      $.getJSON('/' + name + '/api', function (data) {
        try {
          ko.mapping.fromJS(data, viewModel);
        }
        catch (e) {
          error.log(e);
        }
      });
    }, updateInterval);
  });
}  

function subscribeNavigationLongPoll() {
  var longPoll = function() {
    $.ajax({
      method: 'GET',
      url: '/navigation', 
      success: function(data) {
        //console.log(data);
        window.location.href = data.to;
      },
      complete: function() {
        longPoll()
      },
      timeout: 30000
    });
  }
  longPoll();
}

$(function() {
  $(document).ready(function () {
    subscribeNavigationLongPoll();
  });
});