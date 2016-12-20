function initGame(dimension) {
  
  function createMatrix(dim) {
    var arr = [];
    for(var x = 0; x < dim; x++) {
      arr[x] = [];    
      for(var y = 0; y < dim; y++){ 
        arr[x][y] = 0;
      }    
    }
    return arr;
  }    
  
  return {
    world : createMatrix(dimension),
    
    createMatrix : function(dim) {
      return createMatrix(dim);
    },
   
    getRandom : function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    
    getRandomBool : function() {
      return Math.random() > 0.5;
    },
    
    shuffle : function(o) {
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
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