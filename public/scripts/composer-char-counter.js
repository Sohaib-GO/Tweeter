/* eslint-disable no-undef */
$(document).ready(function() {
  // add event listener to the textarea
  $("textarea").on("input", function() {
    // when the user types in the textarea, the event listener will be triggered
    // the event listener will call the function that will count the number of characters
    let counter = 140 - $(this).val().length;
    // the function will update the counter with the number of characters
    $(".counter").text(counter);
    // if the number of characters is more than 140, the counter will turn red
    if (counter < 0) {
      $(".counter").css("color", "red");
    } else {
      // if the number of characters is less than 140, the counter will turn black
      $(".counter").css("color", "black");
    }
  });
});
