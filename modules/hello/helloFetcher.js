'use strict';
var request = require('request');

function oneOf(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getSpecialDayData() {
  let data = null;
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  if (day === 24 && month === 11) {
    data = {
      greeting : oneOf([
        'Merry Christmas!',
        "It's Christmas!",
        'Merry Xmas!']),
      giphyTag : oneOf(['xmas', 'santa']),
      emoji : oneOf(['santa_tone1', 'christmas_tree', 'snowman2', 'gift']),
    }
  }
  else if (day === 4 && month === 4) {
    data = {
      greeting : oneOf([
        "It's Star Wars day!",
        'Happy Star Wars day!',
        'May the Force be with you!']),
      giphyTag : oneOf(['star+wars', 'jedi', 'yoda']),
      emoji : oneOf(['eight_pointed_black_star', 'dizzy', 'robot', 'alien']),
    }
  }
  else if (day === 25 && month === 4) {
    data = {
      greeting : oneOf([
        "It's Towel Day!",
        "Don't Panic!",
        '42!',
        "Don't forget your towel today.",
        'Did you pack your towel today?']),
      giphyTag : oneOf(['galaxy', 'universe']),
      emoji : oneOf(['eight_pointed_black_star', 'dizzy', 'telescope', 'sparkles', 'alien']),
    }
  }
  else if (day === 2 && month === 1) {
    data = {
      greeting : oneOf([
        "Murmeltiertag!",
        "Früher Frühling?",
        "Nnoch 6 Wochen Winter",
        'Sieht Phil seinen Schatten?']),
      giphyTag : oneOf(['groundhogday', 'groundhog', 'winter']),
      emoji : oneOf(['snowman', 'snowman2', 'snowflake', 'chipmunk', 'rainbow', 'partly_sunny']),
    }
  }
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
        data = {
          greeting : oneOf([
            'Hey ' + b.name + ", it's your birthday!",
            'Happy Birthday ' + b.name + '!']),
          giphyTag : 'birthday',
          emoji : oneOf([
            'birthday', 'gift', 'ribbon', 'shopping_bags',
            'balloon', 'tada', 'confetti_ball'])
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

function fetchTimeOfDayStuff(callback) {
  const data = getTimeOfDayData();
  //console.log(data);
  const giphyUrl = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=y&tag=' + data.giphyTag;
  request.get({
    url : giphyUrl,
    json : true
  },
  function(err, httpResponse, body) {
    if (err) {
      // TODO
      console.log(err);
    }
    else {
      //console.log(body);
      data.emoji = 'e1a-' + data.emoji;
      data.gif = {
        url : body.data.fixed_width_downsampled_url,
        width : body.data.fixed_width_downsampled_width,
        height : body.data.fixed_width_downsampled_height
      }
      callback(data);
    }
  });
}


module.exports = {
  fetch : fetchTimeOfDayStuff
};
