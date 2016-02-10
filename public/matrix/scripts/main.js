$(function() {
  var DIM = 32;
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");  
  
  function render() {
    var step = canvas.width / DIM;
    for (var y = 0; y < DIM; y++){ 
      for (var x = 0; x < DIM; x++) {
        ctx.fillStyle = game.mapColor(x, y);
        ctx.strokeRect(x * step, y * step, step, step);
        ctx.fillRect(x * step, y * step, step, step);
      }    
    }
  }
  
  //var game = snake();
  var game = tictactoe();
  game.init(initGame(DIM));
  render();
  
  setInterval(function() {
    game.simulate();
    render();
  }, game.getInterval());
  
});
