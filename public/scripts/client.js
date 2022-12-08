/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet">
    <header class="tweet-header">
      <div class="tweet-pic">
        <img src="${tweet.user.avatars}">
      </div>
      <div class="name">
        <h4>${escape(tweet.user.name)}</h4>
        <p>${escape(tweet.user.handle)}</p>
      </div>
      <div class="handle">
        <p>${timeago.format(tweet.created_at)}</p>
      </div>
    </header>
    <div class="tweet-body">
      <p>${escape(tweet.content.text)}</p>
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

  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    const tweet = $(this).serialize();
    console.log("tweet text", tweet);
    const textArea = $("#tweet-text").val();

    if (textArea.length > 140) {
      $("#empty-error").slideUp();
      $("#too-long-error")
        .slideDown()
        .text("Bruhhh, Limit Your Tweet To 140 Characters Only");
      $("#too-long-error").addClass("error-button");
      // hide error message after validation is done

      return;
    }

    if (textArea === "" || textArea === null) {
      $("#too-long-error").slideUp();
      //display error
      $("#empty-error")
        .slideDown()
        .text(
          "C'mon, Your Mind Can Be Empty But Your Tweet Cannot, Write SomeThing!"
        );
      $("#empty-error").addClass("error-button");
      $("#empty-error").show();
      return;
    }

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: tweet,
    })
      .then(function(response) {
        console.log("response ajax", response);
      })
      // post tweets without refreshing the page
      .then(function() {
        $("#too-long-error").slideUp(); // hide error message after validation is done
        $("#empty-error").slideUp(); // hide error message after validation is done
        loadTweets();
      });
  });
  loadTweets();
});
