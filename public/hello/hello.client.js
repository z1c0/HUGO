'use strict';

function formatBusDisplayLine(viewModel) {
  var line = viewModel.line()+ ' ' + 
    viewModel.to().padRight(18) + 
    viewModel.min().toString().padLeft(2) + '  ';
  var min2 = viewModel.min2;
  if (min2) {
    line += min2().toString().padLeft(2);
  }
  else {
    line += '--';
  }
  return line;
}

(function() {
  hugo.setupDataBinding('bus', 'busmon', { departures : [] }, 10 * 1000);
  hugo.setupDataBinding('calendar',
    'cal', 
    { today: { title: ''}, appointments: [], day : '', month : '' },
    60 * 1000);
  hugo.setupDataBinding('weather',
    'weather',
    { icon : null, temp : null, name : null, description : null }, 
    10 * 1000);
})();
