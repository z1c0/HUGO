'use strict';
var info = require('../modules/hello/timeOfDayInfo');
var assert = require('chai').assert;
var expect = require('chai').expect;

function helper_SpecialDay(day, month) {
  var d = new Date();
  d.setMonth(month - 1);
  d.setDate(day);
  return d;
}

function helper_TimeOfDay(hour) {
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

      { arg: helper_TimeOfWeekDay(1,  6), expected: 'Workout' },
      { arg: helper_TimeOfWeekDay(3,  6), expected: 'Workout' },
      { arg: helper_TimeOfWeekDay(5,  6), expected: 'Workout' },
      { arg: helper_TimeOfWeekDay(0,  8), expected: 'Breakfast' },
      { arg: helper_TimeOfWeekDay(6, 10), expected: 'Breakfast' },

      { arg: helper_TimeOfDay(0), expected: 'Night' },
      { arg: helper_TimeOfDay(7), expected: 'GoodMorning' },
      { arg: helper_TimeOfDay(12), expected: 'Lunch' },
      { arg: helper_TimeOfDay(15), expected: 'Afternoon' },
      { arg: helper_TimeOfDay(18), expected: 'Evening' },

      { arg: helper_TimeOfWeekDay(5, 12), expected: 'BurritoFriday' },
      { arg: helper_WeekDay(6), expected: 'Weekend' },
      { arg: helper_WeekDay(0), expected: 'Weekend' },
    ];

    tests.forEach(function(test) {
      let matches = null;
      let match = null;
      it('correctly matches ' + test.expected, function() {
        matches = info.getMatches(test.arg);
        assert.isAtLeast(matches.length, 1);
        match = matches[0];
        assert.equal(match.id, test.expected);
      });

      it('each match has probability', function() {
        let p = 0;
        matches.forEach(m => {
          expect(m.probability).not.to.be.undefined;
          assert.isAtLeast(m.probability, 0.1);
          assert.isAtMost(m.probability, 1.0);
          p = Math.max(p, m.probability);
        });
        assert.equal(p, 1.0);
      });
      
      it('has content', function() {
        assert.isAtLeast(match.text.length, 2);
        assert.isAtLeast(match.emoji.length, 1);
      });

      it('matches to single result', function() {
        var result = info.get(test.arg);
        assert.isOk(result);
      });
    });
  });

  describe('logicMatcher', function() {
    var m = info.matcher;
    it('evaluate single condition', function() {
      var e = m.is(m.specialDay(10, 3));
      assert.isTrue(e.evaluate(helper_SpecialDay(10, 3)));
      assert.isFalse(e.evaluate(helper_SpecialDay(9, 2)));
    });

    it('evaluate AND', function() {
      var e = m.is(m.specialDay(10, 3))
        .and(function(dt) { return true; })
        .and(function(dt) { return dt.getMonth() === 2; });
      assert.isTrue(e.evaluate(helper_SpecialDay(10, 3)));
      assert.isFalse(e.evaluate(helper_SpecialDay(10, 2)));
      assert.isFalse(e.evaluate(helper_SpecialDay(30, 3)));
    });

    it('evaluate OR', function() {
      var e = m.is(m.specialDay(10, 3)).or(m.specialDay(23, 2)).or(m.specialDay(16, 10));
      assert.isTrue(e.evaluate(helper_SpecialDay(10, 3)));
      assert.isTrue(e.evaluate(helper_SpecialDay(23, 2)));
      assert.isTrue(e.evaluate(helper_SpecialDay(16, 10)));
      assert.isFalse(e.evaluate(helper_SpecialDay(24, 12)));
    });

    it('evaluate AND / OR', function() {
      var e = m.is(m.weekEnd).and(m.timeOfDay(4, 10))
        .or(m.timeOfDay(15, 17)).and(m.weekDay(0));
      assert.isTrue(e.evaluate(helper_TimeOfWeekDay(0, 7)));
      assert.isTrue(e.evaluate(helper_TimeOfWeekDay(0, 16)));
      assert.isFalse(e.evaluate(helper_TimeOfWeekDay(1, 16)));
    });
  });
});