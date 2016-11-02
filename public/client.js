"use strict"

function setIntervalAndExecute(f, t) {
  f();
  return(setInterval(f, t));
}

var dateTimeViewModel = {
  time : ko.observable(),
  seconds : ko.observable()
}
$(document).ready(function () {
  ko.applyBindings(dateTimeViewModel, document.getElementById('datetime'));
});

function zeroLead(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

setIntervalAndExecute(function() {
  var date = new Date();
  dateTimeViewModel.time(zeroLead(date.getHours()) + ':' + zeroLead(date.getMinutes()));
  dateTimeViewModel.seconds(zeroLead(date.getSeconds()));
}, 1000);


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
        ko.applyBindings(viewModel, document.getElementById('main-main'));
        if (updateInterval > 0) {
          setInterval(function () {
            hugo.updateBinding(null);
          }, updateInterval);
        }
      });
    }
  }
}();