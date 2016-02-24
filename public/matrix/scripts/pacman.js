function pacman() {
  var VOID = 0;
  var WALL = 1;
  var PILL = 2;
  var GHOST1 = 10;
  var GHOST2 = 11;
  var GHOST3 = 12;
  var GHOST4 = 13;
  var PACMAN = 20;
  
  return {
    lives: 0,
   
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
      return this.lives == 0;
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
      this.pacman = this.game.getRandomPos();
      this.ghost1 = this.game.getRandomPos();
      this.ghost2 = this.game.getRandomPos();
      this.ghost3 = this.game.getRandomPos();
      this.ghost4 = this.game.getRandomPos();
    },
    
    mapColor : function(x, y) {
      var value = this.world[x][y];
      switch (value) {
        case PACMAN:
          return "yellow";
          
        case PILL:
          return "white";

        case WALL:
          return "darkblue";
      }
      return "black";
    },    
  };
}
