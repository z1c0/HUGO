"use strict"

function subscribe() {
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
  subscribe();
});