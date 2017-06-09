'use strict';

function formatBusDisplayLineOld(viewModel) {
  var line = viewModel.line() + ' ' + 
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

function formatBusDisplayLine(viewModel) {
  var line = viewModel.line().substr(4).padRight(4) + ' ' + 
    viewModel.departs() + ' (' +
    viewModel.duration() + ')';
  return line;
}

(function() {
  //hugo.setupDataBinding('bus', 'bus-old', { departures : [] }, 10 * 1000);
  hugo.setupDataBinding('bus', 'bus', { times : [] }, 30 * 60 * 1000);
  hugo.setupDataBinding('appointments',
    'calendar', 
    { today: { title: ''}, appointments: [], day : '', month : '' },
    10 * 60 * 1000);
  hugo.setupDataBinding('birthdays',
    'birthday', 
    { today: { title: ''}, appointments: [], day : '', month : '' },
    30 * 60 * 1000);
  hugo.setupDataBinding('weather',
    'gallneukirchen',
    { icon : null, temp : null, name : null, description : null }, 
    15 * 60 * 1000);
})();
