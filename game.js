var userClickedPattern = [];
var gamePattern = [];
var level =0;
var buttonColours = ["red","blue","green","yellow"];
$(document).on("keydown",function(){
    nextSequence();
    $("h1").text("Level 0");
});

function nextSequence(){
    userClickedPattern=[];
    $("h1").text("Level "+level);
    level++;//ab = level+1;
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // var audio = new Audio("sounds/"+randomChosenColour+".mp3");
    // audio.play();
    playSound(randomChosenColour);
    // animatePress(randomChosenColour);

}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userChosenColour);
    // console.log(userClickedPattern)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        console.log(userClickedPattern);
        console.log(gamePattern);
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        // console.log("wrong");
        // console.log(userClickedPattern);
        // console.log(gamePattern);
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];

}
$(".restart").click(function(){
    startOver();
    $("h1").text("Press Any key to start");
    playSound("wrong");
    $("p").text("");
    // $(body).fadeIn(10);
});

function patternToString(gamePattern){
    var str = ""
    gamePattern.forEach(function(entry) {
        str+=(entry+" ");
    });
    // console.log(str);
    return str;
    
}
gamePatternString = patternToString(gamePattern);
$("p").html(gamePatternString);

$(".pattern").click(function(){
    $("p").text("Pattern is: "+gamePattern);
});

$(".hide").click(function(){
    $("p").text("Hints Hided");
})