'use strict';

var info = require('../modules/hello/timeOfDayInfo');

let dt = new Date();

dt = new Date(2015, 4, 5);
dt = new Date(2015, 4, 25);
dt = new Date(2015, 11, 24);
dt = new Date(2015, 1, 2); 
dt = new Date(2015, 1, 23); 
dt = new Date(2015, 2, 10); 



console.log();
console.log('*****');
console.log(dt);
console.log(info.getMatch(dt));