var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var firstTime = true;
var userClickedPattern = [];

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  $("h1").text("Level  " + level);
  level++;
}
$(document).keypress(function() {

  if (firstTime) {
    firstTime = false;
    setTimeout(nextSequence(),
      300);
  }
});
$(".btn").click(function() {
  var chosenColor = $(this).attr('id');
  userClickedPattern.push(chosenColor);
  animatePress(chosenColor);
  playSound(chosenColor);
  if (gamePattern.length === userClickedPattern.length) {
    checkAnswer();
  } else {
    var correc = true;
    for (var i = 0; i < userClickedPattern.length; i++) {
      if (gamePattern[i] != userClickedPattern[i]) {
        correc = false;
        break;
      }
    }
    if (!correc) {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 300);
      $(".container").addClass("hide-container");

      $("h1").html("Game Over!<br><br>Your level:  " + level + "<br><br>Press any key to refresh.");
      $(document).keypress(function() {
        startAgain();
      });
    }
  }
});


function playSound(name) {
  var audio = new Audio( name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
}

function checkAnswer() {
  var correct = true;
  for (var i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] != userClickedPattern[i]) {
      correct = false;
      break;
    }
  }
  if (correct) {
    nextSequence();
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 300);
    $(".container").addClass("hide-container");


    $("h1").html("Game Over!<br><br>Your level:  " + level + "<br><br>Press any key to refresh.");
    $(document).keypress(function() {
      startAgain();
    });
  }
  userClickedPattern = [];
}

function startAgain() {
  location.reload();
}
