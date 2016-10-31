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

  const viewModel = {
    allGames : [
      snake(),
      tictactoe(),
    ],
    index : -1,
    title :  ko.observable("..."),
    nextGame : function() {
      if (this.timer) {
        clearInterval(this.timer);
      }

      this.index = (this.index + 1) % this.allGames.length;
      let game = this.allGames[this.index];
      this.title(game.title);

      game.init(initGame(DIM));
      render(game);
      
      this.timer = setInterval(function() {
        game.simulate();
        render(game);
        
        if (game.isOver()) {
          viewModel.nextGame();
        }
      }, game.getInterval());
    }
  }

  $(document).ready(function() {
    ko.applyBindings(viewModel, document.getElementById('main'));
    viewModel.nextGame(); 
  });
});
