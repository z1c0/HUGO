'use strict';

function switchColor(r, g, b) {
  //const url = 'http://' + host + '/?r=' + r + '&g=' + g + '&b=' + b;
  //console.log(url);
  // $.ajax({
  //   method: 'GET',
  //   url: url,
  // });
}

$(function() {
  createColorChooser(
    'color-chooser',
    function(rgb) {
      switchColor(rgb[0], rgb[1], rgb[2]);
    },
    { maximize : true });
});
