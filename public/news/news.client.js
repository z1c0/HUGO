"use strict"

let index = 0;
let interval = 0;
const refreshTime = 20 * 1000;

function animateArticles() {
  let articles = $('.article');
  articles.each(function(i) {
    if (i === index) {
      $(this).addClass('active-article');
    } 
    else {
      $(this).removeClass('active-article');
    }
  });
  index++;

  if (index >= articles.length) {
    index = 0;
    clearInterval(interval);
    pageBinding.update(function(viewModel) {
      interval = setIntervalAndExecute(animateArticles, refreshTime);
    })
  } 
}

$(document).ready(function() {
  interval = setIntervalAndExecute(animateArticles, refreshTime);
});
