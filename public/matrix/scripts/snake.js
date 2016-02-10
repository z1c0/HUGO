function snake() {
  var VOID = 0;
  var SNAKE_UP = 10;
  var SNAKE_DOWN = 11;
  var SNAKE_LEFT = 12;
  var SNAKE_RIGHT = 13;
  var FOOD = 20;
  var WALL = 30;  
  
  function shuffle(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }    
  
  return {
    tail : [],
    head : [],
    food : [],
    grow : 0,    
    
    getInterval : function() {
      return 250;
    },
    
    init : function(game) {
      this.lives = 3;
      this.game = game;
      this.world = game.world;
      this.reset();
    },
    
    isOver : function() {
      return lives == 0;
    },
    
    reset : function() {
      // walls;
      for (var i = 0; i < this.world.length; i++) {
        for (var j = 0; j < this.world.length; j++) {
          var cell = VOID;
          if (i == 0 || j == 0 || i == this.world.length - 1 || j == this.world.length - 1) {
            cell = WALL;
          }
          this.world[i][j] = cell;
        }
      }
      // snake
      var x = this.game.getRandom(5, this.world.length - 10);
      var y = this.game.getRandom(2, this.world.length - 2);
      this.tail[0] = x; 
      this.tail[1] = y;
      this.world[x][y] = SNAKE_RIGHT;
      x++;
      this.world[x][y] = SNAKE_RIGHT;
      x++;
      this.world[x][y] = SNAKE_RIGHT;
      this.head[0] = x;
      this.head[1] = y;
      // food
      this.food = this.game.getRandomPos();
      this.world[this.food[0]][this.food[1]] = FOOD;
    },
    
    mapColor : function(x, y) {
      var value = this.world[x][y];
      switch (value) {
        case SNAKE_UP:
        case SNAKE_DOWN:
        case SNAKE_LEFT:
        case SNAKE_RIGHT:
          return "green";
        
        case FOOD:
          return "orange";

        case WALL:
          return "darkblue";
      }
      return "white";
    },
    
    checkMove : function(cell, dir) {
      var tmp = cell.slice();
      this.setCellValue(tmp, dir);
      var v = this.getCellValue(this.moveCell(tmp));
      return (v == VOID || v == FOOD);
    },
    
    simulate : function() {
      var dir = this.getCellValue(this.head);
      // steer to food
      var dx = this.food[0] - this.head[0];
      var dy = this.food[1] - this.head[1];
      if (dx != 0) {
        if (dir == SNAKE_UP || dir == SNAKE_DOWN) {
          dir = (dx < 0) ? SNAKE_LEFT : SNAKE_RIGHT;
        } 
      }
      if (dy != 0) {
        if (dir == SNAKE_LEFT || dir == SNAKE_RIGHT) {
          dir = (dy < 0) ? SNAKE_UP : SNAKE_DOWN;
        }
      }
      this.setCellValue(this.head, dir);
      
      // check
      dir = this.getCellValue(this.head);
      if (!this.checkMove(this.head, dir)) {
        var o = [];
        if (dir == SNAKE_UP || dir == SNAKE_DOWN) {
          o = shuffle([SNAKE_LEFT, SNAKE_RIGHT]);
        } 
        else {
          o = shuffle([SNAKE_UP, SNAKE_DOWN]);
        }
        if (!this.checkMove(this.head, o[0])) {
          this.checkMove(this.head, o[1]);
        }
      }
      
      // move
      this.move();
    },
    
    getCellValue : function(cell) {
      return this.world[cell[0]][cell[1]];
    },
    
    setCellValue : function(cell, value) {
      this.world[cell[0]][cell[1]] = value;
    },
    
    moveCell : function(cell) {
      var dir = this.getCellValue(cell);
      switch (dir) {
        case SNAKE_UP:
          cell[1]--;
          break;
        case SNAKE_DOWN:
          cell[1]++;
          break;
        case SNAKE_LEFT:
          cell[0]--;
          break;
        case SNAKE_RIGHT:
          cell[0]++;
          break;
      }
      return cell;
    },
    
    move : function() {
      if (this.grow == 0) {
        // move tail
        var oldTail = this.tail.slice();
        this.moveCell(this.tail);
        this.setCellValue(oldTail, VOID);
      }
      else {
        this.grow--;
      }
      // move head
      var vOld = this.getCellValue(this.head);
      this.moveCell(this.head);
      var v = this.getCellValue(this.head);
      switch(v) {
        case FOOD:
          this.food = this.getRandomPos();
          this.setCellValue(this.food, FOOD);
          this.grow = 3;
          // fall through
        
        case VOID:
          this.setCellValue(this.head, vOld);
          break;
          
        default:
          this.lives--;
          this.reset();
      }
    }
  };
}
