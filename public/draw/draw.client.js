'use strict';

function draw() {
  return {
    title : "Draw",
    rgb : 'rgb(0,255,0)',

    getInterval : function() {
      return 200;
    },

    init : function(game) {
      this.world = game.world;
      for (var i = 0; i < this.world.length; i++) {
        for (var j = 0; j < this.world.length; j++) {
          this.world[i][j] = 'rgb(0,0,0)';
        }
      }
    },

    onClick : function(x, y) {
      //console.log(x + '/' + y);
      this.world[x][y] = this.rgb;
    },

    setColor : function(rgb) {
      this.rgb = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')'; 
      console.log(this.rgb);
    },

    save : function() {
      $.ajax({
        type: "POST",
        url: "/matrix/api",
        data: JSON.stringify(this.world),
        contentType: "application/json",
        dataType: "json",
        failure: function(errMsg) {
          alert(errMsg);
        }
      });
    },

    load : function() {
      let world = $('ul li span').first().data('world');
      for (var i = 0; i < this.world.length; i++) {
        for (var j = 0; j < this.world.length; j++) {
          this.world[i][j] = world[i][j];
        }
      }
    },

    simulate : function() {
    },

    isOver : function() {
      return false;
    },

    mapColor : function(x, y) {
      return this.world[x][y];
    }
  }  
}



  $(function() {
    createColorChooser('color-chooser', function(rgb) {
      viewModel.setColor(rgb);
    });
    ko.applyBindings(viewModel, document.getElementById('matrix-ui'));
    viewModel.nextGame(); 
  });
