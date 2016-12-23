'use strict';

$(function() {
  createColorChooser(
    'color-chooser',
    function(rgb) {
       $.ajax({
         method: 'GET',
         url: '/lights/api/set/' + rgb[0] + '/' + rgb[1] + '/' + rgb[2]
       });
    },
    { maximize : true });
});
