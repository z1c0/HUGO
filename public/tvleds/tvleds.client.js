function switchColor(host, r, g, b) {
  const url = 'http://' + host + '/?r=' + r + '&g=' + g + '&b=' + b;
  console.log(url);
  $.ajax({
    method: 'GET',
    url: url,
  });
}

function createColorChooser() {
  var canvas = document.getElementById('color-chooser');
  var ctx = canvas.getContext('2d');

  canvas.style.width='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const columns = 18;
  const rows = 12;
  const w = canvas.width / columns;
  const h = canvas.height / rows;

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < columns; x++) {
      ctx.fillStyle = colors[x + y * columns];
      ctx.fillRect(x * w, y * h, w, h);
    }
  }

  $(canvas).click(function(e) {
    var host = canvas.dataset.ledhost;
    var rgb = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
    switchColor(host, rgb[0], rgb[1], rgb[2]);
  });
}


$(function() {
  createColorChooser();
});
