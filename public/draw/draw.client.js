'use strict';

function draw() {
  return {
    load : function() {
      let world = $('ul li span').first().data('world');
      for (var i = 0; i < this.world.length; i++) {
        for (var j = 0; j < this.world.length; j++) {
          this.world[i][j] = world[i][j];
        }
      }
    }
  }
}

function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.text = function() {
    return 'RGB(' + this.r + ', ' + this.g + ', ' + this.b + ')';
  }
}

function initViewModel() {
  const DIM = 32;
  var canvas = document.getElementById('draw-canvas');
  var ctx = canvas.getContext('2d');
  const step = canvas.width / DIM;

  let viewModel = {
    id : ko.observable(''),
    name : ko.observable(''),
    color : ko.observable(new Color(0, 222, 0)),
    init : function() {
      this.data = [];
      this.name('hugo');
      this.id('');
      for (var x = 0; x < DIM; x++) {
        this.data[x] = [];
        for (var y = 0; y < DIM; y++) { 
          this.data[x][y] = new Color(0, 0, 0);
        }
      }
      this.render();
    }, 
    render : function() {
      for (var y = 0; y < DIM; y++){ 
        for (var x = 0; x < DIM; x++) {
          var col = 'rgb(' + this.data[x][y].r + ', ' + this.data[x][y].g + ', ' + this.data[x][y].b + ')';
          ctx.fillStyle = col;
          ctx.strokeStyle = "#AAA";
          ctx.strokeRect(x * step, y * step, step, step);
          ctx.fillRect(x * step, y * step, step, step);
        }
      }
    },
    save : function() {
      $.ajax({
        type: "POST",
        url: "/draw/api/save",
        data: JSON.stringify({
          id : this.id(),
          name : this.name(),
          data : this.data
        }),
        contentType: "application/json",
        dataType: "json",
        failure: function(errMsg) {
          alert(errMsg);
        }
      });
    },
    remove : function() {
      $.ajax({
        type: 'GET',
        url: '/draw/api/delete/' + this.id(),
        contentType: "application/json",
        dataType: "json",
        failure: function(errMsg) {
          alert(errMsg);
        }
      });
    },
    load : function(model) {
      $.ajax({
        type: 'GET',
        url: '/draw/api/load/' + this.id(),
        contentType: "application/json",
        dataType: "json",
        success: function(response) {
          viewModel.id(response._id);
          viewModel.name(response.name);
          viewModel.data = response.data;
          viewModel.render();
        },
        failure: function(errMsg) {
          alert(errMsg);
        }
      });
    },
  };

  createColorChooser('color-chooser', function(rgb) {
    viewModel.color(new Color(rgb[0], rgb[1], rgb[2]));
  });

  function click(e) {
    var x = Math.min(DIM - 1, Math.floor((e.pageX - e.target.offsetLeft) / step));
    var y = Math.min(DIM - 1, Math.floor((e.pageY - e.target.offsetTop) / step));
    var col = viewModel.color();
    viewModel.data[x][y] = new Color(col.r, col.g, col.b);
    viewModel.render();
  }

  $(canvas).mousemove(function (e) {
    if (e.which === 1) {
      click(e);
    }
  });
  $(canvas).click(function (e) {
    click(e);
  });

  viewModel.init();

  return viewModel;
}

