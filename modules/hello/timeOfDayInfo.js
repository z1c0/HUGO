'use strict'

function specialDay(day, month) {
  var d = new Date();
  d.setDate(day);
  d.setMonth(month - 1);
  return d;
}

function bdayTemplate(who, when) {
  return {
    id : who,
    date : when,
    text : [
      'Hey ' + who.name + ", it's your birthday!",
      'Happy Birthday ' + who.name + '!'
    ],
    tag : 'birthday',
    emoji : [ 'birthday', 'gift', 'ribbon', 'shopping_bags', 'balloon', 'tada', 'confetti_ball' ]
  };
};



var candidates = [
  {
    id : 'XMAS',
    date : specialDay(24, 12),
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
    date : specialDay(4, 5),
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
    date : specialDay(25, 5),
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
    date : specialDay(2, 2),
    text : [
      "Murmeltiertag!",
      "Früher Frühling ...?",
      "... oder noch 6 Wochen Winter?",
      'Sieht Phil seinen Schatten?'
    ],
    tag : [ 'groundhogday', 'groundhog', 'winter' ],
    emoji : ['snowman', 'snowman2', 'snowflake', 'chipmunk', 'rainbow', 'partly_sunny' ],
  },
  bdayTemplate('Steffi', specialDay(23, 2)),
  bdayTemplate('Timo', specialDay(16, 10)),
  bdayTemplate('Nico', specialDay(3, 12)),
  bdayTemplate('Wolfgang', specialDay(10, 3)),

  /*
  {
    id : 'abc',
    date : specialDay(24, 12),
    text : [
    ],
    tags : [ '', '' ],
    emoji : [ '', '' ]
  }
  */
];

/*
  else {
    const birthdays = [
      { name : 'Bernoulli', day : 3,  month : 11 },
      { name : 'Timo', day : 16,  month : 9 },
      { name : 'Steffi', day : 23,  month : 1 },
      { name : 'Wolfgang', day : 10,  month : 2 },
    ];
    birthdays.forEach(b => {
      if (b.day === day && b.month === month) {
        console.log(b);
        }
      }
    });
  }
  return data; 
}

function getTimeOfDayData() {
  let data = getSpecialDayData();
  if (data) {
    return data;
  }

  let giphyTag = 'hello';
  let greeting = 'Hey there ...';
  let emoji = 'grinning';

  const date = new Date();
  const hour = date.getHours();
  const weekDay = date.getDay();

  if (hour >= 0 && hour < 6) {
    greeting = oneOf([
      'You really should be sleeping ...',
      'Warum noch auf?',
      'Kannst du morgen ausschlafen?',
      'No work tomorrow?']);
    giphyTag = 'sleeping';
    emoji = oneOf(['sleeping', 'thinking', 'bridge_at_night', 'zzz', 'full_moon_with_face']);
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
      greeting = oneOf([ 
        'Have a great day!',
        'Have an awesome day!',
        'Good morning handsome!'
      ]);
      emoji = oneOf(['coffee', 'tea', 'ok_hand', 'v', 'sunrise', 'sunrise_over_mountains', 'smile_cat']);
      giphyTag = oneOf(['good+morning', 'sunrise', 'wake+up', 'coffee']);
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
      emoji = oneOf(['taco', 'burrito']);
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
  else if (hour >= 18) {
    greeting = oneOf([
      'Enjoy your evening',
      'Go watch some Netflix ...',
      'Netflix and chill?']);
    emoji = oneOf(['tv', 'joystick',  'bridge_at_night', 'night_with_stars', 'wine_glass']);
    giphyTag = oneOf(['tv', 'netflix', 'movie', 'sunset']);
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
    let score = 0;

    if (c.date.getDate() === dt.getDate() && c.date.getMonth() === dt.getMonth()) {
      score = 10;
    }
    
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
