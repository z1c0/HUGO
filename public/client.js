"use strict"

function setIntervalAndExecute(f, t) {
  f();
  return setInterval(f, t);
}

function padHelper(string, maxLen, padChar, left) {
  if (!padChar) {
    padChar = ' ';
  }
  let pad = new Array(maxLen + 1 - string.length).join(padChar);
  return left ? (pad + string) : (string + pad);
}

String.prototype.padLeft = function(maxLen, padChar) {
  return padHelper(this, maxLen, padChar, true);
};

String.prototype.padRight = function(maxLen, padChar) {
  return padHelper(this, maxLen, padChar, false);
};


//---------------------------------------------------------------------------------------------


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
    setupDataBinding : function(elementName, moduleName, json, updateInterval) {
      let binding = {
        update : function(callback) {
          let viewModel = this.viewModel;
          $.getJSON(this.updateUrl, function(data) {
            try {
              //console.log(data);
              ko.mapping.fromJS(data, viewModel);
              if (callback) {
                callback(viewModel);
              }
            }
            catch (e) {
              console.log(e);
            }
          });
        }
      };

      $(function() {
        binding.updateUrl =  '/' + moduleName + '/api';
        binding.viewModel = ko.mapping.fromJS(json);
        const el = document.getElementById(elementName);
        if (!el) {
          alert("element '" + elementName + "' not found");
        }
        ko.applyBindings(binding.viewModel, el);
        if (updateInterval > 0) {
          setIntervalAndExecute(function () {
            binding.update(null);
          }, updateInterval);
        }
      });
      return binding;
    }
  }
}();