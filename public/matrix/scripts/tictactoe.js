function tictactoe() {
  var VOID = 0;
  var GRID = 1;
  var CIRCLE = 2;
  var CIRCLE_WIN = 12;
  var CROSS = 3;
  var CROSS_WIN = 13;
   
  return {
    playerOne : false,
    
    getInterval : function() {
      return 500;
    },
    
    init : function(game) {
      this.roundsToPlay = 3;
      this.game = game;
      this.world = game.world;
      this.field = game.createMatrix(3);
      this.reset();
    },
    
    reset : function() {
      this.showWinner = 0;
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
    
    checkLine : function(cells, mark) {
      var x = 0;
      var o = 0;
      for (var i = 0; i < 3; i++) {
        var v = this.field[cells[i][0]][cells[i][1]];
        if (v == CIRCLE) {
          o++;
        }
        else if (v == CROSS) {
          x++;
        }
      }
      if (mark && (x == 3 || o == 3)) {
        this.showWinner = 5;
        for (var i = 0; i < 3; i++) {
          this.draw(cells[i][0], cells[i][1], this.field[cells[i][0]][cells[i][1]] + 10); 
        }
      }
      return {
        x : x,
        o: o,
      };
    },
    
    checkIfOver : function() {
      if (this.showWinner == 0) {
        this.checkLine([[0, 0], [1, 1], [2, 2]], true);
        this.checkLine([[2, 0], [1, 1], [0, 2]], true);
        for (var i = 0; i < 3; i++) {
          this.checkLine([[i, 0], [i, 1], [i, 2]], true);
          this.checkLine([[0, i], [1, i], [2, i]], true);
        }
        if (this.showWinner > 0) {
          return true;
        }
      }
      
      var voids = 0;
      for (var i = 0; i < this.field.length; i++) {
        for (var j = 0; j < this.field.length; j++) {
          if (this.field[i][j] == VOID) {
            voids++;
          }
        }
      }
      return voids == 0;
    },
    
    simulate : function() {
      if (this.checkIfOver()) {
        if (this.showWinner > 0) {
          this.showWinner--;
        }
        if (this.showWinner == 0) {
          this.reset();
          this.roundsToPlay--;
        }
      }
      else {
        var pos = this.getNextPos();
        var what = this.playerOne ? CIRCLE : CROSS;
        this.draw(pos.x, pos.y, what);
        this.field[pos.x][pos.y] = what;
        this.playerOne = !this.playerOne;
      }
    },
    
    isOver : function() {
      return this.roundsToPlay == 0;
    },
    
    draw : function(col, row, what) {
      var offX = col * 11 + 1;
      var offY = row * 11 + 1;
      if (what == CIRCLE || what == CIRCLE_WIN) {
        this.world[offX + 3][offY + 0] = what;
        this.world[offX + 2][offY + 1] = what;
        this.world[offX + 1][offY + 1] = what;
        this.world[offX + 1][offY + 2] = what;
        this.world[offX + 0][offY + 3] = what;
      }
      else {
        this.world[offX + 0][offY + 0] = what;
        this.world[offX + 1][offY + 1] = what;
        this.world[offX + 2][offY + 2] = what;
        this.world[offX + 3][offY + 3] = what;
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
           
         case CIRCLE_WIN:
         case CROSS_WIN:
           return 'yellow';
           
        default:
          return 'darkgray';
      }
    }
  }
}