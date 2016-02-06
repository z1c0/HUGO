function snake() {
  var SNAKE_UP = 10;
  var SNAKE_DOWN = 11;
  var SNAKE_LEFT = 12;
  var SNAKE_RIGHT = 13;
  var FOOD = 20;
  var WALL = 30;
  
  return {
    head : [],
    tail : [],
    food : [],
    
    getRandomEmptyPos : function() {
      var x = Math.floor(Math.random() * this.world.length);
      var y = Math.floor(Math.random() * this.world.length);
      if (this.world[x][y] == 0) {
        return [x, y];
      }
      else {
        return this.getRandomEmptyPos();
      }
    },
    
    init : function(world) {
      this.world = world;
      // walls;
      for (var i = 0; i < this.world.length; i++) {
        this.world[i][0] = WALL;
        this.world[i][this.world.length - 1] = WALL;
        this.world[0][i] = WALL;
        this.world[this.world.length - 1][i] = WALL;
      }
      
      this.head = this.getRandomEmptyPos();
      this.food = this.getRandomEmptyPos();
      this.world[this.head[0]][this.head[1]] = SNAKE_UP;
      this.world[this.food[0]][this.food[1]] = FOOD;
    },
    
    mapColor : function(value) {
      switch (value) {
        case SNAKE_UP:
        case SNAKE_DOWN:
        case SNAKE_LEFT:
        case SNAKE_RIGHT:
          return "green";
        
        case FOOD:
          return "yellow";

        case WALL:
          return "blue";
      }
      return "white";
    },
    
    simulate : function() {
      // check
      
      // turn
      
      // move
      this.move();
    },
    
    move : function() {
      var dir = this.world[this.head[0]][this.head[1]];
      this.world[this.head[0]][this.head[1]] = 0;
      switch (dir) {
        case SNAKE_UP:
          this.head[1]--;
          break;
      }
      this.world[this.head[0]][this.head[1]] = dir;
    }
  };
}
