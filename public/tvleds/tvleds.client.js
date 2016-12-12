function switchColor(host, r, g, b) {
  const url = 'http://' + host + '/?r=' + r + '&g=' + g + '&b=' + b;
  console.log(url);
  $.ajax({
    method: 'GET',
    url: url,
  });
}

$(function() {
  var host = canvas.dataset.ledhost;
  createColorChooser('color-chooser', function(rgb) {
    switchColor(host, rgb[0], rgb[1], rgb[2]);
  });
});
