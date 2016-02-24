$(function() {
  var DIM = 32;
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");  
  
  function render(game) {
    var step = canvas.width / DIM;
    for (var y = 0; y < DIM; y++){ 
      for (var x = 0; x < DIM; x++) {
        ctx.fillStyle = game.mapColor(x, y);
        ctx.strokeRect(x * step, y * step, step, step);
        ctx.fillRect(x * step, y * step, step, step);
      }    
    }
  }
  
  function startGame() {
    var r = Math.random(),
        game;
    
    if (r > 0.95) {
      game = snake();
    }
    else {
      game = pacman();
    }
    
    game.init(initGame(DIM));
    render(game);
    
    var timer = setInterval(function() {
      game.simulate();
      render(game);
      
      if (game.isOver()) {
        clearInterval(timer);
        startGame();
      }
    }, game.getInterval());
  }
  
  startGame();
});
