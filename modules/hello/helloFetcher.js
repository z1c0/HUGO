"use strict"
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
      greeting : 'Merry Christmas!',
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
          greeting : 'Happy Birthday ' + b.name + '!',
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
  else if (hour >= 11 && hour < 18) {
    if (weekDay === 5) {
      greeting = "It's burrito Friday!";
      giphyTag = 'burrito';
      emoji = oneOf(['taco', 'burrito']);
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
  else if (hour >= 18) {
    greeting = oneOf([
      'Enjoy your evening',
      'Go watch some Netflix ...',
      'Netflix and chill?']);
    emoji = oneOf(['tv', 'joystick',  'bridge_at_night', 'night_with_stars', 'wine_glass']);
    giphyTag = oneOf(['tv', 'netflix', 'movie', 'sunset']);
  }
  
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
