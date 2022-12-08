/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const createTweetElement = function (tweet) {
    const $tweet = $(`
    <article class="tweet">
    <header class="tweet-header">
      <div class="tweet-pic">
        <img src="${tweet.user.avatars}">
      </div>
      <div class="name">
        <h2>${tweet.user.name}</h2>
        <p>${tweet.user.handle}</p>
      </div>
      <div class="handle">
        <p>${tweet.created_at}</p>
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

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".tweetContainer").prepend($tweet);
    }
  };

  renderTweets(data);

  
  $("#tweet-form").submit(function (event) {
    event.preventDefault();
    const tweet = $(this).serialize();
    console.log("tweet text", tweet);

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: tweet,
    }).then(function (response) {
      console.log("response ajax",response);
    });
  });
});
