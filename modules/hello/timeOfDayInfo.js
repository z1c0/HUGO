'use strict'

function specialDay(day, month) {
  return function(dt) {
    var score = 0;
    if (day === dt.getDate() && (month - 1) === dt.getMonth()) {
      score = 10;
    }
    return score;
  }
}

function birthday(who, day, month) {
  return {
    id : who,
    match : specialDay(day, month),
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

function timeOfDay(hourFrom, hourTo) {
  return function(dt) {
    var score = 0;
    if (dt.getHours() >= hourFrom && dt.getHours() < hourTo) { 
      score = 1;
    }
    return score;
  }
}


var candidates = [
  {
    id : 'XMAS',
    match : specialDay(24, 12),
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
    match : specialDay(4, 5), 
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
    match : specialDay(25, 5),
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
    match : specialDay(2, 2),
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
    id : 'Nikolaus',
    match : specialDay(6, 12), 
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
    match : specialDay(31, 12),
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
    match : specialDay(1, 1), 
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
    match : specialDay(3, 9),
    text : [
      'Gratulation zum  Hochzeitstag!',
      'Frohen Hochzeitstag!',
      'Schönen Hochzeitstag!'
    ],
    tag : [ 'wedding', 'bride' ],
    emoji : [ 'church', 'tophat', 'wedding', 'champagne_glass', 'ring', 'bride_with_veil' ]
  },

  birthday('Steffi', 23, 2),
  birthday('Timo', 16, 10),
  birthday('Nico', 3, 12),
  birthday('Wolfgang', 10, 3),
  
  {
    id : 'Night',
    match : timeOfDay(0, 6),
    text : [
      'You really should be sleeping ...',
      'So spät noch auf ...?',
      'Immer noch munter ...?',
      'Kannst du morgen ausschlafen?',
      'No work tomorrow?'
    ],
    tag : [ 'sleeping' ],
    emoji : [ 'sleeping', 'thinking', 'bridge_at_night', 'zzz', 'full_moon_with_face']
  },
  {
    id : 'GoodMorning',
    match : timeOfDay(6, 11),
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
    id : 'Evening',
    match : timeOfDay(18, 24), 
    text : [
      ['Play a game?', [ 'joystick' ]],
      ['Take a relaxing bath?', [ 'bathtub', 'bath_tone1' ]],
      'Enjoy your evening',
      ['Watch some Netflix?', [ 'tv' ]],
      ['Netflix and chill?', [ 'smirk', 'tv' ]]
    ],
    tag : ['tv', 'netflix', 'movie', 'sunset' ],
    emoji : [ 'wine_glass', 'bridge_at_night', 'night_with_stars']
  }

//wochendfrühstück
//:pancakes:
//:croissant:
//:cooking:
//:tea:
// :coffee:

];

/*

function getTimeOfDayData() {
  } 
  else if (hour >= 6 && hour < 11) {
    if (hour < 8 && Math.random() > 0.5 && (weekDay === 1 || weekDay === 3 || weekDay === 5)) {
      greeting = oneOf([ 
        "Go get 'em!",
        'Good morning champion!',
        'Ready for a good workout?',
        'Ready for your workout?'
      ]);
      giphyTag = oneOf(['workout', 'weightlifting', 'muscle', 'motivational']);
      emoji = oneOf(['thumbsup_tone1', 'lifter', 'muscle']);
    }
    else {
    }
  }
  else if (hour >= 11 && hour < 15) {
    if (weekDay === 5) {
      greeting = oneOf([
        "It's Burrito Friday!",
        "TGIF!",
        "TGI(Burrito)F!",
        "Burrito Freitag!",
        'Burrito, Burrito, Burrito']),
      giphyTag = 'burrito';
      emoji = oneOf(['taco', 'burrito', 'avocado' hot_pepper]);
    }
    else if (weekDay === 6 || weekDay === 7) {
      greeting = oneOf([
        'Wochenende!',
        'Was steht am Programm?',
        "Los geht's! Wochenendausflug!"]),
      giphyTag = 'weekend';
      emoji = oneOf(['tada', 'dancer_tone2', 'beers', 'cocktail', 'tropical_drink', 'man_dancing_tone2']);
    }
    else {
      greeting = oneOf([ 
        'Enjoy your lunch!',
        "What's for lunch today?"
      ]);      
      giphyTag = 'lunch';
      emoji = oneOf([
        'pizza', 'hamburger', 'fries', 'apple', 'sushi', 'cooking', 'poultry_leg',
        'watermelon', 'shallow_pan_of_food', 'stew', 'spaghetti', 'fork_knife_plate']);
    }
  }
  else if (hour >= 15 && hour < 18) {
    greeting = oneOf([ 
      'Einkaufen gehen?',
      'Malen?',
      'Basteln?',
      'Ein Runde Fahrad fahren?',
      'Auf den Spielplatz?'
    ]);      
    giphyTag = oneOf([
      'playground', 'groceries'
    ]);
    emoji = oneOf([
      'mountain_bicyclist', 'bicyclist', 'basketball_player_tone1', 'soccer', 'art',
      'game_die', 'basketball', 'microphone', 'musical_score']);
  }  
  }
  //emoji: bath
  // entspannungsbad?
  return {
    giphyTag : giphyTag,
    greeting : greeting,
    emoji : emoji
  }
}

*/


function getMatchForTime(dt) {
  let match = null;
  let hiscore = 0;
  candidates.forEach(c => {
    let score = c.match(dt);
    if (score > hiscore) {
      hiscore = score;
      match = c;
    } 
  });
  return match;
}

module.exports = {
  getMatch : getMatchForTime
};
