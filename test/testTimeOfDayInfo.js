'use strict';
var info = require('../modules/hello/timeOfDayInfo');
var assert = require('chai').assert;

function helper_SpecialDay(day, month){
  var d = new Date();
  d.setMonth(month - 1);
  d.setDate(day);
  return d;
}

function helper_TimeOfDay(hour){
  var d = new Date();
  d.setHours(hour);
  return d;
}

function helper_WeekDay(day) {
  return new Date(2016, 10, 20 + day);
}

function helper_TimeOfWeekDay(day, hour){
  var d = helper_WeekDay(day);
  d.setHours(hour);
  return d;
}

describe('timeOfDayInfo', function() {
  describe('getMatch()', function() {
    var tests = [
      { arg: helper_SpecialDay( 2, 2), expected: 'GroundhogDay' },
      { arg: helper_SpecialDay( 4, 5), expected: 'StarWars' },
      { arg: helper_SpecialDay(25, 5), expected: 'TowelDay' },
      { arg: helper_SpecialDay(31, 10), expected: 'Halloween' },
      { arg: helper_SpecialDay( 6, 12), expected: 'Nikolaus' },
      { arg: helper_SpecialDay(24, 12), expected: 'XMAS' },
      { arg: helper_SpecialDay(31, 12), expected: 'Sylvester' },
      { arg: helper_SpecialDay( 1,  1), expected: 'NewYear' },
      { arg: helper_SpecialDay( 3,  9), expected: 'WeddingDay' },
      { arg: helper_SpecialDay(23,  2), expected: 'Steffi' },
      { arg: helper_SpecialDay(10,  3), expected: 'Wolfgang' },
      { arg: helper_SpecialDay(16, 10), expected: 'Timo' },
      { arg: helper_SpecialDay( 3, 12), expected: 'Nico' },

      { arg: helper_TimeOfWeekDay(1, 6), expected: 'Workout' },
      { arg: helper_TimeOfWeekDay(3, 6), expected: 'Workout' },
      { arg: helper_TimeOfWeekDay(5, 6), expected: 'Workout' },

      { arg: helper_TimeOfDay(0), expected: 'Night' },
      { arg: helper_TimeOfDay(6), expected: 'GoodMorning' },
      { arg: helper_TimeOfDay(12), expected: 'Lunch' },
      { arg: helper_TimeOfDay(15), expected: 'Afternoon' },
      { arg: helper_TimeOfDay(18), expected: 'Evening' },

      { arg: helper_TimeOfWeekDay(5, 12), expected: 'BurritoFriday' },
      { arg: helper_WeekDay(6), expected: 'Weekend' },
      { arg: helper_WeekDay(0), expected: 'Weekend' }
    ];

    tests.forEach(function(test) {
      let matches = null;
      let result = null;
      it('correctly matches ' + test.expected, function() {
        matches = info.getMatches(test.arg);
        assert.isAtLeast(matches.length, 1);
        result = matches[0];
        assert.equal(result.id, test.expected);
      });
      
      it('has text', function() {
        assert.isAtLeast(result.text.length, 2);
        assert.isAtLeast(result.emoji.length, 1);
      });
    });
  });
});
