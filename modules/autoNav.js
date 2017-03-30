'use strict';
var Cursor = require('./cursor.js').Cursor;
var EventEmitter = require('events').EventEmitter  
var messageBus = new EventEmitter();

var currentAutoNav = '';

function setIntervalAndExecute(f, t) {
  f();
  return setInterval(f, t);
}

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
      console.log('[autonav ==> ' + data.to);
      messageBus.emit(msgId, data);
    }
  }

  let navigatables = [];
  modules.forEach(m => {
    if (!m.disableNav) {
      navigatables.push(m);
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

  if (!cursor.isEmpty()) {
    //
    // Time-based auto-nav
    //
    setInterval(() => {
      let data = null;
      var hour = new Date().getHours();

      navigatables.forEach(n => {
        if (n.navHours.indexOf(hour) != -1) {
          if (currentAutoNav !== n.displayName) {
            currentAutoNav = n.displayName;
            data = prepare(n.route);
          }
        }
      });

      if (!data) {
         // "default"
        if (currentAutoNav !== 'hello') {
          currentAutoNav = 'hello';
          data = prepare(currentAutoNav);
        }
      }

      navigate(data);
    }, 1000 * 60);
  }
}

module.exports = {
  init : init
};