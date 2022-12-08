/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const data = [];

  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet">
    <header class="tweet-header">
      <div class="tweet-pic">
        <img src="${tweet.user.avatars}">
      </div>
      <div class="name">
        <h4>${tweet.user.name}</h4>
        <p>${tweet.user.handle}</p>
      </div>
      <div class="handle">
        <p>${timeago.format(tweet.created_at)}</p>
      </div>
    </header>
    <div class="tweet-body">
      <p>${tweet.content.text}</p>
    </div>
    <footer class="tweet-footer">
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    
    </footer>
    </article>
    `);
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".tweetContainer").prepend($tweet);
    }
  };

  renderTweets(data);

  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    const tweet = $(this).serialize();
    console.log("tweet text", tweet);

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: tweet,
    }).then(function(response) {
      console.log("response ajax", response);
    });
  });

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
    })
      //success callback function will simply call up renderTweets, passing it the response from the AJAX request.
      .then(function(response) {
        console.log("response ajax", response);
        renderTweets(response);
      });
  };

  loadTweets();
});
