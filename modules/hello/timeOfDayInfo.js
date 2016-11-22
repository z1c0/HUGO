'use strict';

var matcher = {
  specialDay : function(day, month) {
    return function(dt) {
      return  day === dt.getDate() && (month - 1) === dt.getMonth();
    }
  },

  timeOfDay : function(hourFrom, hourTo) {
    return function(dt) {
      return dt.getHours() >= hourFrom && dt.getHours() < hourTo; 
    }
  },

  weekDay : function (weekDay) {
    return function(dt) {
      return dt.getDay() === weekDay;
    }    
  },

  timeOfWeekDay : function (weekDay, hourFrom, hourTo) {
    return function(dt) {
      return matcher.weekDay(weekDay)(dt) && matcher.timeOfDay(hourFrom, hourTo)(dt);
    }    
  },

  workoutDay : function(dt) {
    return matcher.timeOfWeekDay(1, 6, 7)(dt) || 
      matcher.timeOfWeekDay(3, 6, 7)(dt) ||
      matcher.timeOfWeekDay(5, 6, 7)(dt);
  },

  weekend : function(dt) {
    return matcher.weekDay(6)(dt) || matcher.weekDay(0)(dt);
  }
}


function birthday(who, day, month) {
  return {
    id : who,
    match : matcher.specialDay(day, month),
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
    id : 'XMAS',
    match : matcher.specialDay(24, 12),
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
    match : matcher.specialDay(4, 5), 
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
    match : matcher.specialDay(25, 5),
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
    match : matcher.specialDay(2, 2),
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
    match : matcher.specialDay(31, 10),
    text: [
      'Halloween!',
      'Happy Halloween!',
      ['Trick or Treat!', [ 'chocolate_bar', 'lollipop', 'candy' ]]
      ['Süßes oder Saures!', [ 'chocolate_bar', 'lollipop', 'candy' ]]
    ],
    tag : [ 'halloween' ],
    emoji : [ 'jack_o_lantern', 'spider', 'ghost', 'skull', 'spider', 'spider_web']
  },
  {
    id : 'Nikolaus',
    match : matcher.specialDay(6, 12), 
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
    match : matcher.specialDay(31, 12),
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
    match : matcher.specialDay(1, 1), 
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
    match : matcher.specialDay(3, 9),
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
    match : matcher.workoutDay,
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
    match : matcher.timeOfWeekDay(5, 11, 16),
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
    id : 'Weekend',
    match : matcher.weekend,
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

//wochendfrühstück
//:pancakes:
//:croissant:
//:cooking:
//:tea:
// :coffee:

  {
    id : 'GoodMorning',
    match : matcher.timeOfDay(6, 11),
    text : [ 
      'Have a great day!',
      'Guten Morgen!',
      'Rise and shine!',
      'Have an awesome day!',
      'Good morning handsome!'
    ],
    tag : [ 'good+morning', 'sunrise', 'wake+up', 'coffee' ],
    emoji : [ 'shower', 'coffee', 'tea', 'ok_hand', 'v', 'sunrise', 'sunrise_over_mountains', 'smile_cat' ]
  },
  {
    id : 'Lunch',
    match : matcher.timeOfDay(11, 15),
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
    match : matcher.timeOfDay(15, 18), 
    text : [ 
      ['Müssen wir noch einkaufen?', [ 'shopping_cart', 'shopping_bags' ]],
      ['Ein Bild malen?', [ 'art', 'crayon' ]],
      ['Langeweile ...?', [ 'unamused', 'poop' ]],
      ['Einfach Musik hören?', [ 'cd', 'radio', 'musical_keyboard']],
      ['An apple a day ...', [ 'apple', 'pill' ]],
      ["Wie wär's mit einem Spiel?", [ 'game_die' ]] 
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
    match : matcher.timeOfDay(18, 24), 
    text : [
      ['Wanna play a game?', [ 'joystick', 'alien', 'space_invader', 'gun' ]],
      ['Take a relaxing bath.', [ 'bathtub', 'bath_tone1' ]],
      'Enjoy your evening',
      ['Ein Projekt wartet ...', ['keyboard', 'computer', 'bar_chart', 'wrench', 'mouse_three_button' ]] 
      ['Watch some Netflix?', [ 'tv' ]],
      ['Netflix and chill?', [ 'smirk', 'tv' ]]
    ],
    tag : ['tv', 'netflix', 'movie', 'sunset' ],
    emoji : [ 'wine_glass', 'tumbler_glass', 'bridge_at_night', 'night_with_stars']
  },
  {
    id : 'Night',
    match : matcher.timeOfDay(0, 6),
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
    if (c.match(dt)) {
      matches.push(c);
    }
  });
  return matches;
}

function oneOf(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getSingleMatchForTime() {
  const matches = getMatchesForTime(new Date());
  const m = matches[0];
  let result = {};
  const t = oneOf(m.text);
  if (typeof t === 'string') {
    result.text = t;
  }
  else {
    result.text = t[0];
    result.emoji = oneOf(t[1]);
  }
  result.tag = oneOf(m.tag);
  if (!result.emoji) {
    result.emoji = oneOf(m.emoji);
  }
  result.emoji = 'e1a-' + result.emoji;
  return result;
}


module.exports = {
  getMatches : getMatchesForTime,
  get : getSingleMatchForTime
};
