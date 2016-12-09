const letters = [
  [ 'A', 'apple' ],
  [ 'B', 'banana' ],
  [ 'C', 'clown' ],
  [ 'D', 'dolphin' ],
  [ 'E', 'elephant' ],
  [ 'F', 'fish' ],
  [ 'G', 'guitar' ],
  [ 'H', 'house_with_garden' ],
  [ 'I', 'flag_it' ],
  [ 'J', 'flag_jp' ],
  [ 'K', 'camel' ],
  [ 'L', 'lion_face' ],
  [ 'M', 'mouse2' ],
  [ 'N', 'nose_tone1' ],
  [ 'O', 'ear_tone1' ],
  [ 'P', 'penguin' ],
  [ 'Q', 'frog' ],
  [ 'R', 'rocket' ],
  [ 'S', 'snake' ],
  [ 'T', 'taxi' ],
  [ 'U', 'metro' ],
  [ 'V', 'bird' ],
  [ 'W', 'whale' ],
  [ 'X', 'negative_squared_cross_mark' ],
  [ 'Y', 'regional_indicator_y:' ],
  [ 'Z', 'checkered_flag' ],
];

$(function() {
  var abcViewModel = {
    letter : ko.observable(),
    icon : ko.observable()
  }
  ko.applyBindings(abcViewModel, document.getElementById('abc'));
  setIntervalAndExecute(function() {
    var i = Math.floor(Math.random() * letters.length) + 1
    abcViewModel.letter(letters[i][0]);
    abcViewModel.icon('e1a-' + letters[i][1]);
  }, 1000 * 20);
});