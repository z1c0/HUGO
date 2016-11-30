'use strict';
var EventEmitter = require('events').EventEmitter  
var messageBus = new EventEmitter();


var Cursor = function(array) {
  var idx = 0;
  this.previous = function () {
    idx = (!!idx ? idx : array.length) - 1;
    return array[idx];
  };
  this.current = function () {
    return array[idx];
  };
  this.setCurrent = function(c) {
    let i = array.indexOf(c);
    if (i >= 0) {
      idx = i;
    }
  }
  this.next = function () {
    idx = (idx + 1) % array.length;
    return array[idx];
  };
  return this;
};

function prepare(route) {
  if (route[0] !== '/') {
    route = '/' + route;
  }
  return {
    to : route
  };
}

function init(router, modules) {
  const path = '/navigation';
  const msgId = 'message'; 

  function navigate(data) {
    if (data) {
      console.log("autonav to: " + data.to);
      messageBus.emit(msgId, data);
    }
  }

  let navigatables = [];
  modules.forEach(m => {
    if (m.config.autoNav) {
      navigatables.push(m.getRoute());
    }
  });
  //console.log(navigatables);
  var cursor = new Cursor(navigatables);
  //
  // Routes
  //
  router.get(path, function(req, res) {
    var addMessageListener = function(res) {
      messageBus.once(msgId, function(data) {
        res.json(data)
      })
    }
    addMessageListener(res)
  });
  router.post(path, function(req, res) {
    console.log(req.body);
    let code = 200;
    let data = null;
    if (req.body.cmd) {
      switch (req.body.cmd) {
        case 'prev':
          data = prepare(cursor.previous());
          break;

        case 'next':
          data = prepare(cursor.next());
          break;

        case 'goto':
          data = prepare(req.body.data);
          break;

        default:
          console.log('Unknown command: ' + req.body.cmd);
          code = 500;
          break;
      }
    }
    if (code === 200) {
      navigate(data);
    }
    res.status(code).end();
  })
  //
  // Time-based auto-nav
  //
  setInterval(() => {
    let data = null;
    var dt = new Date();
    if (dt.getHours() >= 10 && dt.getHours() < 11 && cursor.current() !== 'news') {
      cursor.setCurrent("news");
      data = prepare(cursor.current());
    }
    else if (dt.getHours() >= 14 && dt.getHours() < 15 && cursor.current() !== 'photos') {
      cursor.setCurrent("photos");
      data = prepare(cursor.current());
    }
    navigate(data);
  }, 1000 * 10);
}

module.exports = {
  init : init
};