function tictactoe() {
  var VOID = 0;
  var GRID = 1;
  var CIRCLE = 2;
  var CROSS = 3;
   
  return {
    playerOne : false,
    
    getInterval : function() {
      return 500;
    },
    
    init : function(game) {
      this.game = game;
      this.world = game.world;
      this.field = game.createMatrix(3);
      this.reset();
    },
    
    reset : function() {
      this.playOne = this.game.getRandom(0, 100) > 50;
      
      for (var i = 0; i < this.field.length; i++) {
        for (var j = 0; j < this.field.length; j++) {
          this.field[i][j] = VOID;
        }
      }
       
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
    
    getNextPos : function() {
      while (true) {
        var x = this.game.getRandom(0, 3);
        var y = this.game.getRandom(0, 3);
        if (this.field[x][y] == 0) {
          return {
            x : x,
            y : y,
          };
        }
      }
    },
    
    simulate : function() {
      var voids = 0;
      for (var i = 0; i < this.field.length; i++) {
        for (var j = 0; j < this.field.length; j++) {
          if (this.field[i][j] == VOID) {
            voids++;
          }
        }
      }
      if (voids == 0) {
        this.reset();
      }
      
      var pos = this.getNextPos();
      var what = this.playerOne ? CIRCLE : CROSS;
      this.draw(pos.x, pos.y, what);
      this.field[pos.x][pos.y] = what; 
      this.playerOne = !this.playerOne;      
    },
    
    draw : function(col, row, what) {
      var offX = col * 11 + 1;
      var offY = row * 11 + 1;
      if (what == CIRCLE) {
        this.world[offX + 3][offY + 0] = CIRCLE;
        this.world[offX + 2][offY + 1] = CIRCLE;
        this.world[offX + 1][offY + 1] = CIRCLE;
        this.world[offX + 1][offY + 2] = CIRCLE;
        this.world[offX + 0][offY + 3] = CIRCLE;
      }
      else {
        this.world[offX + 0][offY + 0] = CROSS;
        this.world[offX + 1][offY + 1] = CROSS;
        this.world[offX + 2][offY + 2] = CROSS;
        this.world[offX + 3][offY + 3] = CROSS;
      }
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          var x = offX + j;
          var y = offY + i;
          var v = this.world[x][y];
          this.world[x][offY + 7 - i] = v;
          this.world[offX + 7 - j][y] = v;
          this.world[offX + 7 - j][offY + 7 - i] = v;
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