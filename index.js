//alert("working");
var buttonColours=["red", "blue", "green", "yellow"];
var gameArray=[];
var userChosenPattern=[];
var started=false;
var level=0;

$(document).on('keypress',function()
{if(!started)
{
  started=true;
  nextSequence();
}

});


function nextSequence()
{
  userChosenPattern=[];
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gameArray.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  level++;

}

$(".btn").click(function()
{
   var userChosenColour=this.id;
  //console.log(userChosenColour);
  userChosenPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAns(userChosenPattern.length-1);


  //console.log(userChosenPattern);
});


function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(name)
{
  $("#"+name).addClass("pressed");
  setTimeout(function()
{
  $("#"+name).removeClass("pressed");
},100);
}




function checkAns(currentLevel) {

    if (gameArray[currentLevel] === userChosenPattern[currentLevel]) {

      console.log("success");

      if (userChosenPattern.length === gameArray.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function()
    {
      $("body").removeClass("game-over");
    },200);
    startOver();
    }

}

function startOver()
{
  started=false;
  level=0;
  gameArray=[];
  userChosenPattern=[];
}
