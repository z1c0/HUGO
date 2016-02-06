$(function() {
  var DIM = 32;
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  
  function initWorld() {
    var arr = [];
    for(var x = 0; x < DIM; x++) {
      arr[x] = [];    
      for(var y = 0; y < DIM; y++){ 
        arr[x][y] = 0;
      }    
    }
    return arr;
  }
  
  var world = initWorld();
  
  function render() {
    var step = canvas.width / DIM;
    for (var y = 0; y < DIM; y++){ 
      for (var x = 0; x < DIM; x++) {
        ctx.fillStyle = game.mapColor(world[x][y]);
        ctx.strokeRect(x * step, y * step, step, step);
        ctx.fillRect(x * step, y * step, step, step);
      }    
    }
  }
  
  var game = snake();
  
  game.init(world);
  setInterval(function() {
    game.simulate();
    render();
  }, 200);
  
});
