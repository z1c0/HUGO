'use strict';

function draw() {
  return {
    title : "Draw",
    rgb : 'white',

    getInterval : function() {
      return 200;
    },

    init : function(game) {
      this.world = game.world;
      for (var i = 0; i < this.world.length; i++) {
        for (var j = 0; j < this.world.length; j++) {
          this.world[i][j] = 'black';
        }
      }
    },

    onClick : function(x, y) {
      //console.log(x + '/' + y);
      this.world[x][y] = this.rgb;
    },

    setColor : function(rgb) {
      this.rgb = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')'; 
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