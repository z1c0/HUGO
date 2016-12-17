'use strict';

$(function() {
  const DIM = 32;
  var canvas = document.getElementById("myCanvas");
  const step = canvas.width / DIM;
  var ctx = canvas.getContext("2d");

  function addClickHandler(game) {
    function click(e) {
      if (game.onClick) {
        game.onClick(
          Math.floor(e.pageX / step), 
          Math.floor(e.pageY / step));
      }
    }
    $(canvas).mousemove(function (e) {
      if (e.which === 1) {
        click(e);
      }
    });
    $(canvas).click(function (e) {
      click(e);
    });
  }

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
      draw()
      //snake(),
      //tictactoe(),
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
      addClickHandler(game);
      render(game);
      
      this.timer = setInterval(function() {
        game.simulate();
        render(game);
        
        if (game.isOver()) {
          viewModel.nextGame();
        }
      }, game.getInterval());
    },
    save : function() {
      let game = this.allGames[this.index];
      if (game.save) {
        game.save();
      }
    },
    load : function() {
      let game = this.allGames[this.index];
      if (game.load) {
        game.load();
      }
    },
    setColor : function(rgb) {
      let game = this.allGames[this.index];
      if (game.setColor) {
        game.setColor(rgb);
      }
    }
  }

  $(function() {
    createColorChooser('color-chooser', function(rgb) {
      viewModel.setColor(rgb);
    });
    ko.applyBindings(viewModel, document.getElementById('matrix-ui'));
    viewModel.nextGame(); 
  });
});
