var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var gameLevel = 0;
var click = 0;
var isGood = 0;

$(document).on("keypress", (e) => {
  if (e.key === "a") {
    startGame();
  }
});

function startGame() {
  newSequence();
  userClickedPattern = [];
  $(".btn").on("click", handleClick);
  click = 0;
  gameLevel++;
}

function checkAnswer(gameLevel, click) {
  console.log(gamePattern, userClickedPattern, gameLevel, click);
  if (click > gameLevel) {
    isGood = 0;
    return 0;
  }
  isGood = 1;
  return gamePattern[click] === userClickedPattern[click] ? 1 : 0;
}

function handleClick(e) {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  $("#" + userChosenColor).addClass("pressed");
  setTimeout(() => {
    $("#" + userChosenColor).removeClass("pressed");
  }, 100);
  animatePress(userChosenColor);
  checkAnswer(gameLevel, click) ? playAudio(userChosenColor) : GameOver();
  click++;
  console.log(click, gameLevel);
  if (click === gameLevel && isGood === 1) {
    startGame();
  }
  e.stopImmediatePropagation();
}

function animatePress(color) {
  $("#" + color)
    .fadeOut(50)
    .fadeIn(300);
}

function GameOver() {
  var gameOver = new Audio("sounds/wrong.mp3");
  gameOver.play();
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  $(document).on("keypress", (e) => {
    if (e.key) {
      gamePattern = [];
      userClickedPattern = [];
      gameLevel = 0;
      click = 0;
      isGood = 0;
      startGame();
    }
  });
}

function playAudio(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function newSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("h1").text("Level " + gameLevel);
  let i = 0;
  setInterval(() => {
    animatePress(gamePattern[i]);
    playAudio(gamePattern[i]);
    i++;
    if (i == gameLevel - 1) {
      clearInterval();
    }
  }, 1000);
}
