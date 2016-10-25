"use strict"

var hugo = function() {
  var viewModel = null;
  var updateUrl = '';

  function subscribeNavigationLongPoll() {
    $(document).ready(function () {
      var longPoll = function() {
        $.ajax({
          method: 'GET',
          url: '/navigation', 
          success: function(data) {
            console.log(data);
            window.location.href = data.to;
          },
          complete: function() {
            longPoll()
          },
          timeout: 30000
        });
      }
      longPoll();
    });
  };

  subscribeNavigationLongPoll();

  return {
    updateBinding : function(callback) {
      $.getJSON(updateUrl, function (data) {
        try {
          ko.mapping.fromJS(data, viewModel);
          if (callback) {
            callback(viewModel);
          }
        }
        catch (e) {
          console.log(e);
        }
      });
    },
    
    setupDataBinding : function(name, json, updateInterval) {
      $(document).ready(function () {
        updateUrl =  '/' + name + '/api';
        viewModel = ko.mapping.fromJS(json);
        ko.applyBindings(viewModel);
        if (updateInterval > 0) {
          setInterval(function () {
            hugo.updateBinding(null);
          }, updateInterval);
        }
      });
    }
  }
}();