function game(world) {
  return {
    world : world,
    
    getRandom : function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    
    getRandomPos : function() {
      var x = this.getRandom(0, this.world.length);
      var y = this.getRandom(0, this.world.length);
      if (this.world[x][y] == 0) {
        return [x, y];
      }
      else {
        return this.getRandomPos();
      }
    }    
  }
}