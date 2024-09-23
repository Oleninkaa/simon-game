var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;
const header = $("h1");

function nextSequence(){
    console.log(userClickedPattern);
    console.log(gamePattern);

    userClickedPattern = [];

    level++;
    header.text(`level ${level}`);

    const randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(`game = ${gamePattern}`);
    animatePress(randomChosenColour);
    flash( $(`#${randomChosenColour}`), 500);
    playSound(randomChosenColour);
    
    
   
}

function flash(element, time = 200){
    element.fadeOut(time/2).fadeIn(time);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $(`.${currentColour}`).toggleClass('pressed');
    setTimeout(function(){
        
        $(`.${currentColour}`).toggleClass('pressed');
    }, 100)
    
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

        
    }
    else {
        playSound('wrong');
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },300);
        header.text("Game Over, Press Enter to Restart");
        startOver()
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

$(".btn").click(function(){
    const clickedColor = $(this).attr("id");
    userClickedPattern.push(clickedColor);
    playSound(clickedColor);
    animatePress(clickedColor);
    
    
   
    console.log(`user = ${userClickedPattern}`);

    checkAnswer(userClickedPattern.length-1);
});


$(document).on("keydown", function(event){
    if(!gameStarted){
        if(event.key == "Enter"){
            
            header.text(`level ${level}`);
            nextSequence();
            gameStarted = true;
        }
        
    }
   
})  











