function tictactoe() {
  var VOID = 0;
  var GRID = 1;
  var CIRCLE = 2;
  var CROSS = 3;
    
  return {
    getInterval : function() {
      return 1000;
    },
    
    init : function(world) {
      this.world = world;
      this.reset();
    },
    
    reset : function() {
      for (var i = 0; i < this.world.length; i++) {
        for (var j = 0; j < this.world.length; j++) {
          var col = VOID;
          if (i != 0 && j != 0 && i != this.world.length - 1 && j != this.world.length - 1) {
            if (i == 10 || i == 21 || j == 10 || j == 21) {
              col = GRID;
            }
          }
          this.world[i][j] = col;
        }
      }
    },
    
    simulate : function() {
      this.drawCircle(0, 0);
      this.drawCircle(1, 1);
      this.drawCircle(2, 2);
    },
    
    drawCircle : function(col, row) {
      var width = 10;
      var offsetX = col + 1;
      var offsetY = row + 1;
      for (var i = 0; i < width - 2; i++) {
        for (var j = 0; j < width - 2; j++) {
          var x = offsetX + j + col * width;
          var y = offsetY + i + row * width;
          this.world[x][y] = CIRCLE;
        }
      }
    },
    
    mapColor : function(x, y) {
      switch (this.world[x][y]) {
        case GRID:
          return 'white';
          
         case CIRCLE:
           return 'blue';
        
         case CROSS:
           return 'lightgreen';
           
        default:
          return 'darkgray';
      }
    }
  }
}