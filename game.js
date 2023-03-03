var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var started = false
var level = 0;

function nextSequence(){  //generate next pattern in the sequence
    userClickedPattern = [];//Once nextSequence() is triggered, reset userClickedPattern

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
};

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){$("#" + currentColour).removeClass("pressed");},100)
}




$(document).keypress(function() {  //detecting keypress for the first time
    if (!started) {
        $("#level-title").text("Level " + level); //h1 originally is "Press A Key to Start" but then changes to "Level 0".
        nextSequence();
        started = true;  //after started, stop detecting keypress
    }
  });

$(".btn").on("click", function(event){    //detecting button click
    var userChosenColour = event.target.id;  //var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);  //check answer everytime a button is clicked
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {  //If user got the most recent answer right, check if they have finished their sequence
            setTimeout(function(){nextSequence()}, 1000);     //call nextSequence() after a 1000 millisecond delay
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over", 200);
        });
        $("h1").text("Game Over, Press Any Key to Restart");
        $(document).keypress(startOver());  //call startOver() when any key is pressed
    }
}

function startOver(){
    level = 0;  //reset level, gamepattern, started
    gamePattern = [];
    started = false;
}









