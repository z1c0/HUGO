'use strict';

const Day = {
  Mon : 1,
  Tue : 2,
  Wed : 3,
  Thur : 4,
  Fr : 5,
  Sa : 6,
  So : 0
} 

const Probability = {
  veryUnlikely : 0.15,
  unlikely : 0.25,
  possible : 0.5,
  likely : 0.75,
  veryLikely : 0.85,
  certain : 1.0
} 

function matchFactor(f) {
  return {
    _f : [ f ],
    evaluate : function(dt) {
      for (var i = 0; i < this._f.length; i++) {
        if (!this._f[i](dt)) {
          return false;
        }
      }
      return true;
    },
  }
}

function matchTerm(f) {
  return {
    _f : [ matchFactor(f) ],
    evaluate : function(dt) {
      for (var i = 0; i < this._f.length; i++) {
        if (this._f[i].evaluate(dt)) {
          return true;
        }
      }
      return false;
    },
    or : function(f) {
      this._f.push(matchFactor(f));
      return this;
    },
    and : function(f) {
      this._f[this._f.length - 1]._f.push(f);
      return this;
    }
  }
}

function is(f) {
  if (!f) {
    throw new Error("f must be defined");
  }
  return matchTerm(f);
}



function specialDay(day, month) {
  return function(dt) {
    return day === dt.getDate() && (month - 1) === dt.getMonth();
  }
}

function timeOfDay(hourFrom, hourTo) {
  return function(dt) {
    return dt.getHours() >= hourFrom && dt.getHours() < hourTo; 
  }
}

function weekDay(day) {
  return function(dt) {
    return dt.getDay() === day;
  }    
}

function timeOfWeekDay(day, hourFrom, hourTo) {
  return function(dt) {
    return weekDay(day)(dt) && timeOfDay(hourFrom, hourTo)(dt);
  }
}

function weekEnd(dt) {
  return weekDay(Day.Sa)(dt) || weekDay(Day.So)(dt);
}



function birthday(who, day, month) {
  return {
    id : who,
    match : is(specialDay(day, month)),
    probability : Probability.possible,
    text : [
      'Hey ' + who.name + ", it's your birthday!",
      'Happy Birthday ' + who.name + '!'
    ],
    tag : 'birthday',
    emoji : [ 
      'birthday', 'cake', 'gift', 'ribbon', 'shopping_bags', 
      'balloon', 'tada', 'confetti_ball', 'champagne'
    ]
  };
};


var candidates = [
  {
    id : 'CatDay',
    match : is(specialDay(8, 8)),
    probability : Probability.possible,
    text : [
      "It's International Cat Day!",
      'Miau! Miau! Miau!',
      'Meow! Meow! Meow!',
      'Heute ist internationaler Katzentag!',
    ],
    tag : [ 'cat' ],
    emoji : [ 'cat', 'cat2', 'smiley_cat', 'kissing_cat', 'smile_cat', 'heart_eyes_cat' ]
  },
  {
    id : 'XMAS',
    match : is(specialDay(24, 12)),
    probability : Probability.possible,
    text : [
      'Merry Christmas!',
      'Frohe Weihnachten!',
      "It's Christmas!",
      'Merry Xmas!' 
    ],
    tag : [ 'xmas', 'santa' ],
    emoji : [ 'santa_tone1', 'christmas_tree', 'snowman2', 'gift']
  },
  {
    id : 'StarWars',
    match : is(specialDay(4, 5)), 
    probability : Probability.possible,
    text : [
      "It's Star Wars day!",
      'Happy Star Wars day!',
      'May the Force be with you!'
    ],
    tag : [ 'star+wars', 'jedi', 'yoda'],
    emoji : [ 'eight_pointed_black_star', 'dizzy', 'robot', 'alien' ]
  },
  {
    id : 'TowelDay',
    match : is(specialDay(25, 5)),
    probability : Probability.possible,
    text : [
      "It's Towel Day!",
      "Don't Panic!",
      '42!',
      "Don't forget your towel today.",
      'Did you pack your towel today?'
    ],
    tags : [ 'galaxy', 'universe' ],
    emoji : [ 'eight_pointed_black_star', 'dizzy', 'telescope', 'sparkles', 'alien' ]
  },
  {
    id : 'GroundhogDay',
    match : is(specialDay(2, 2)),
    probability : Probability.possible,
    text : [
      "Murmeltiertag!",
      "Früher Frühling ...?",
      "... oder noch 6 Wochen Winter?",
      'Sieht Phil seinen Schatten?'
    ],
    tag : [ 'groundhogday', 'groundhog', 'winter' ],
    emoji : [ 'snowman', 'snowman2', 'snowflake', 'chipmunk', 'rainbow', 'partly_sunny' ]
  },
  {
    id : 'Halloween',
    match : is(specialDay(31, 10)),
    probability : Probability.possible,
    text: [
      'Halloween!',
      'Happy Halloween!',
      ['Heute is Weltspartag', [ 'moneybag', 'dollar', 'euro', 'money_with_wings', 'money_mouth']],
      ['Alles Gute zum Namenstag!', [ 'blush', 'kissing_closed_eyes', 'wink' ]],
      ['Trick or Treat!', [ 'chocolate_bar', 'lollipop', 'candy' ]],
      ['Süßes oder Saures!', [ 'chocolate_bar', 'lollipop', 'candy' ]]
    ],
    tag : [ 'halloween' ],
    emoji : [ 'jack_o_lantern', 'spider', 'ghost', 'skull', 'spider', 'spider_web']
  },
  {
    id : 'Nikolaus',
    match : is(specialDay(6, 12)), 
    probability : Probability.possible,
    text : [
      "Nikolausabend!",
      "Nikolaus!",
      "Nikolaustag!",
      "Waren alle brav?"
    ],
    tag : [ 'santa', 'nikolaus' ],
    emoji : [ 'tangerine', 'santa_tone1', 'snowflake', 'peanuts' ]
  },
  {
    id : 'Sylvester',
    match : is(specialDay(31, 12)),
    probability : Probability.possible,
    text : [
      'Guten Rutsch!',
      'Prosit ' + (new Date().getFullYear() + 1),
    ],
    tag : [ 'fireworks', 'sylvester' ],
    emoji : [
      'sparkler', 'fireworks', 'champagne', 'champagne_glass', 'pig_nose', 
      'pig', 'tophat', 'four_leaf_clover'
    ]
  },
  {
    id : 'NewYear',
    match : is(specialDay(1, 1)), 
    probability : Probability.possible,
    text : [
      "Prosit Neujahr!",
      "Ein gutes neues Jahr!",
      "Frohes neues Jahr!"
    ],
    tag : [ 'clover', 'newyear' ],
    emoji : [ 'pig_nose', 'four_leaf_clover', 'tophat', 'thumbsup', 'pig' ]
  },
  {
    id : 'WeddingDay',
    match : is(specialDay(3, 9)),
    probability : Probability.possible,
    text : [
      'Gratulation zum  Hochzeitstag!',
      'Frohen Hochzeitstag!',
      'Schönen Hochzeitstag!'
    ],
    tag : [ 'wedding', 'bride' ],
    emoji : [ 
      'church', 'bouquet', 'rose', 'tophat', 'wedding',
      'champagne_glass', 'man_in_tuxedo', 'ring', 'bride_with_veil'
    ]
  },

  birthday('Steffi', 23, 2),
  birthday('Timo', 16, 10),
  birthday('Nico', 3, 12),
  birthday('Wolfgang', 10, 3),
  
  {
    id : 'Workout',
    match : is(timeOfWeekDay(Day.Mon, 6, 7)).
      or(timeOfWeekDay(Day.Wed, 6, 7)).
      or(timeOfWeekDay(Day.Fr, 6, 7)),
    probability : Probability.veryLikely,
    text : [ 
      "Go get 'em!",
      ['Good morning champion!', [ 'star', 'trophy', 'first_place', 'first_place' ]],
      'Ready for a good workout?',
      'Ready for your workout?'
    ],
    tag : ['workout', 'weightlifting', 'muscle', 'motivational'],
    emoji : ['thumbsup_tone1', 'lifter', 'muscle']
  },
  {
    id : 'BurritoFriday',
    match : is(timeOfWeekDay(5, 11, 16)),
    probability : Probability.likely,
    text : [
      "It's Burrito Friday!",
      "TGIF!",
      "TGI(Burrito)F!",
      "Burrito Freitag!",
      'Burrito, Burrito, Burrito'
    ],
    tag : 'burrito',
    emoji : [ 'taco', 'burrito', 'avocado', 'hot_pepper' ]
  },
  {
    id : 'Breakfast',
    match : is(weekEnd).and(timeOfDay(7, 11)),
    probability : Probability.likely,
    text : [
      'Ausgeschlafen?',
      ['Frühstück für Champions!' [ 'trophy', 'grinning', 'thumbsup' ]],
      'Wochenendfrühstück!'
    ],
    tag : 'breakfast',
    emoji : [ 'pancakes', 'croissant', 'cooking', 'tea', 'coffee' ]
  },
  {
    id : 'Weekend',
    match : is(weekEnd),
    probability : Probability.likely,
    text : [
      'Wochenende!',
      'Was steht am Programm?',
      "Los geht's! Wochenendausflug!"
    ],
    tag : 'weekend',
    emoji : [
      'tada', 'dancer_tone2', 'beers', 'cocktail',
      'tropical_drink', 'man_dancing_tone2'
    ]
  },
  {
    id : 'GoodMorning',
    match : is(timeOfDay(6, 11)),
    probability : Probability.certain,
    text : [ 
      'Have a great day!',
      'Guten Morgen!',
      'Rise and shine!',
      'Have an awesome day!',
      'Good morning handsome!'
    ],
    tag : [ 'good+morning', 'sunrise', 'wake+up', 'coffee' ],
    emoji : [ 
      'shower', 'coffee', 'tea', 'ok_hand', 'v', 'sunrise',
      'sunrise_over_mountains', 'smile_cat' 
    ]
  },
  {
    id : 'Lunch',
    match : is(timeOfDay(11, 15)),
    probability : Probability.certain,
    text : [
      'Mahlzeit',
      'Enjoy your lunch!',
      "What's for lunch today?"
    ],      
    tag : 'lunch',
    emoji : [
      'pizza', 'hamburger', 'fries', 'apple', 'sushi', 'cooking', 'poultry_leg',
      'watermelon', 'shallow_pan_of_food', 'stew', 'spaghetti', 'fork_knife_plate'
    ],
  },
  {
    id : 'Afternoon',
    match : is(timeOfDay(15, 18)), 
    probability : Probability.certain,
    text : [ 
      ['Müssen wir noch einkaufen?', [ 'shopping_cart', 'shopping_bags' ]],
      ['Ein Bild malen?', [ 'art', 'crayon' ]],
      ['Langeweile ...?', [ 'unamused', 'poop' ]],
      ['Einfach Musik hören?', [ 'cd', 'radio', 'musical_keyboard']],
      ['An apple a day ...', [ 'apple', 'pill' ]],
      ["Wie wär's mit einem Spiel?", [ 'game_die' ]],
      ['Ein Buch lesen?', ['books', 'books', 'closed_book']],
      ['Vielleicht basteln?', [ 'scissors', 'paperclips', 'straight_ruler', 'triangular_ruler' ]],
      ['Ein Runde Fahrad fahren?', [ 'mountain_bicyclist', 'bicyclist' ]],
      ['Auf den Spielplatz?', ['basketball_player_tone1', 'soccer', 'basketball']]
    ],
    tag : [ 'playground', 'afternoon'],
    emoji : [ 'monkey' ],
  },
  {
    id : 'Evening',
    match : is(timeOfDay(18, 24)), 
    probability : Probability.certain,
    text : [
      ['Wanna play a game?', [ 'joystick', 'video_game', 'alien', 'space_invader' ]],
      ['Take a relaxing bath.', [ 'bathtub', 'bath_tone1' ]],
      'Enjoy your evening',
      ['Ein Projekt wartet ...', ['keyboard', 'computer', 'bar_chart', 'wrench', 'mouse_three_button' ]],
      ['Watch some Netflix?', [ 'tv' ]],
      ['Netflix and chill?', [ 'smirk', 'tv' ]]
    ],
    tag : ['tv', 'netflix', 'movie', 'sunset' ],
    emoji : [ 'wine_glass', 'tumbler_glass', 'bridge_at_night', 'night_with_stars']
  },
  {
    id : 'Night',
    match : is(timeOfDay(0, 6)),
    probability : Probability.certain,
    text : [
      'You really should be sleeping ...',
      'So spät noch auf ...?',
      'Immer noch munter ...?',
      'Kannst du morgen ausschlafen?',
      'No work tomorrow?'
    ],
    tag : [ 'sleeping' ],
    emoji : [
      'sleeping', 'thinking', 'bed', 'sleeping_accommodation',
      'bridge_at_night', 'zzz', 'full_moon_with_face']
  },
];

function getMatchesForTime(dt) {
  let matches = [];
  candidates.forEach(c => {
    if (c.match.evaluate(dt)) {
      matches.push(c);
    }
  });
  return matches;
}

function oneOf(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getSingleMatchForTime(dt) {
  if (!dt) {
    dt = new Date();
  }
  const matches = getMatchesForTime(dt);
  let match = null;
  matches.forEach(m => {
    if (Math.random() <= m.probability) {
      match = m;
    }
  });

  let result = {};
  const t = oneOf(match.text);
  if (typeof t === 'string') {
    result.text = t;
  }
  else {
    result.text = t[0];
    result.emoji = oneOf(t[1]);
  }
  result.tag = oneOf(match.tag);
  if (!result.emoji) {
    result.emoji = oneOf(match.emoji);
  }
  result.emoji = 'e1a-' + result.emoji;
  return result;
}


module.exports = {
  matcher : {  // Exported for unit test
    is : is,
    specialDay : specialDay,
    timeOfDay : timeOfDay,
    weekDay : weekDay,
    weekEnd : weekEnd
  },
  getMatches : getMatchesForTime,
  get : getSingleMatchForTime
};
