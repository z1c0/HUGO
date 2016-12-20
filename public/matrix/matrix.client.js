'use strict';

$(function() {
  const DIM = 32;
  var canvas = document.getElementById('matrix-canvas');
  let w = Math.min(window.innerWidth, window.innerHeight);
  canvas.style.width = w;
  canvas.style.height = w;
  canvas.style.marginLeft = ((window.innerWidth - w) / 2) + 'px'; 
  canvas.width = w;
  canvas.height = w;
  const step = canvas.width / DIM;
  var ctx = canvas.getContext("2d");

  function render(game) {
    for (var y = 0; y < DIM; y++){ 
      for (var x = 0; x < DIM; x++) {
        ctx.fillStyle = game.mapColor(x, y);
        ctx.strokeStyle = "#AAA";
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
    nextGame : function() {
      if (this.timer) {
        clearInterval(this.timer);
      }

      this.index = (this.index + 1) % this.allGames.length;
      let game = this.allGames[this.index];

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

  $(function() {
    ko.applyBindings(viewModel, document.getElementById('matrix-canvas'));
    viewModel.nextGame(); 
  });
});
