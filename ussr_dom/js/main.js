/**
 * Created by postepenno on 02.04.2015.
 */


var LEVEL_START_ID = 0;
var ANIMATION = true;

var $posterContainer;
var $poster;
var $sticker;
var $next;
var items;
var itemIndex;

var sndCorrect;
var sndWrong;
//var sndMusic;

var soundsEnabled;
var correctAnswers;

$(document).ready(function() {

    initSounds();

    $posterContainer = $(".poster-container");
    $poster = $(".poster");
    $sticker = $(".sticker");
    $next = $(".mybtn-next");

    $(".bb-trackTitle").hide();
    $next.hide();
    $(".fader").hide();
    itemIndex = LEVEL_START_ID;
    correctAnswers = 0;

    $("#introModal").modal('show');

    //$(".lights").animate({width:"200px"}, 1000);

    $.getJSON("js/data.json", function(data){

        items = data.items;
        //items = data.items.slice(0, 1);

        $next.click(function() {

            $next.hide();

            itemIndex++;
            if (itemIndex == items.length)
            {
                gameComplete();
            }
            else
            {
                if (ANIMATION)
                {
                    var $fader = $(".fader");
                    $fader.show();
                    $fader.css("opacity", 0);
                    $fader.animate({opacity:1}, 300, function() {

                        $(".answers").html("");
                        loadItem();

                        $fader.animate({opacity:0}, 300, function() {
                            $fader.hide();
                        });
                    });
                }
                else
                {
                    $(".answers").html("");
                    loadItem();
                }
            }


        });

        loadItem();
    });

    $(".mybtn-sound").click(function(){
        if (soundsEnabled)
        {
            soundsEnabled = false;
            //sndMusic.stop();
            $(this).addClass("mybtn-sound-off");
        }
        else
        {
            soundsEnabled = true;
            //sndMusic.play();
            $(this).removeClass("mybtn-sound-off");
        }
    });

    $(".mybtn").click(function() {
        playSound(sndClick);
    });

});

function gameComplete()
{
    var $p1 = $("<h2>Товарищ, твой результат: " + correctAnswers + " из " + items.length + "</h2>");

    var commentTxt = "";
    if (correctAnswers < 10) commentTxt = "Слабовато. Попробуй еще раз.";
    else if (correctAnswers < 20) commentTxt = "Дружище, тебе нужно лучше знать историю своей страны!";
    else if (correctAnswers < 30) commentTxt = "Неплохо, мой друг. Из тебя бы вышел отличный коммунист!";
    else commentTxt = "Ни одной ошибки! Скажи честно - тебе 100 лет и все советские плакаты были нарисованы при твоей жизни?";

    var $p2 = $("<h3>" + commentTxt + "</h3>");
    $(".result").append($p1);
    $(".result").append($p2);
    $("#gameCompleteModal").modal('show');
}

function initSounds()
{
    soundsEnabled = true;
    sndCorrect = getHowlSound("sndLevelComplete");
    sndWrong = getHowlSound("sndWrong");
    sndClick = getHowlSound("sndClick");
    //sndMusic = getHowlSound("music", true);
    //sndMusic.loop = true;

    //sndMusic.play();
}

function getHowlSound(assetName, loop)
{
    if (!loop) loop = false;
    return new Howl({
        urls:["assets/sounds/" + assetName + ".mp3", "assets/sounds/" + assetName + ".ogg"],
        loop:loop
    })
}

function playSound(snd)
{
    if (soundsEnabled) snd.play();
}

function loadItem()
{
    var item = items[itemIndex];
    var img = item.img;

    var $ul = $("<ul></ul>");
    $(".answers").append($ul);
    var answers = shuffleAndCopy(item.answers);
    for (var i = 0; i < answers.length; i++)
    {
        var $li = $("<li class='answer-item'>" + answers[i] + "</li>");
        $li.css("opacity", 0);
        $li.css("top", "+20px");
        $li.delay(i * 100).animate({opacity:1, top:"0px"}, 500);
        $ul.append($li);
    }
    /*$(".answer-item").css("transform", "translateX(50px)");*/

    var posterUrl = "url('assets/" + img + "')";
    var stickerUrl = "url('assets/sticker.png')";

    $poster.css("background-image", posterUrl);
    $sticker.css("opacity", "1");
    $sticker.css("background-image", stickerUrl);
    $sticker.css("left", item.sx + "px");
    $sticker.css("top", item.sy + "px");
    $sticker.css("background-size", item.sw + "px" + " auto");
    $sticker.css("height", item.sw);
    $sticker.css("width", item.sw);

    $(".question").html(item.question);
    var levelNum = "Плакат " + (itemIndex + 1) + "/" + items.length;
    $(".level-number").html(levelNum);

    $(".answer-item").click(function() {
        $(this).addClass("selected");
        var allLi = $(this).parent().children();
        allLi.css("cursor", "auto");
        allLi.off();

        $(this).animate({"margin-left":"-20px"}, 500);

        playSound(sndClick);

        var $lights = $(".lights");
        if (ANIMATION)
        {
            $lights.animate({opacity:1}, 200);
            $lights.animateRotate(180, 1500, "linear", checkAnswer);
            setTimeout(function() {
                $sticker.animate({opacity:0}, 500);
                $lights.animate({opacity:0}, 200);
            }, 1000);
        }
        else
        {
            checkAnswer();
            $sticker.css("opacity", 0);
        }

    });

    var $lights = $(".lights");
    $lights.css("left", item.sx + "px");
    $lights.css("top", item.sy + "px");
    $lights.css("background-size", item.sw * 1 + "px" + " auto");
    $lights.css("width", item.sw * 1);
    $lights.css("height", item.sw * 1);
    $lights.css("opacity", 0);

}

function checkAnswer()
{
    var correctAnswer = items[itemIndex].answers[0];
    $(".answers li:contains(" + correctAnswer + ")").addClass("correct");
    var playerAnswer = $(".selected").html();
    if (playerAnswer == correctAnswer)
    {
        correctAnswers++;
        playSound(sndCorrect);
    }
    else
    {
        playSound(sndWrong);

    }

    $next.fadeIn();
    //$next.show();
}

$.fn.animateRotate = function(angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.complete = $.proxy(args.complete, e);
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(e, arguments);
        };

        $({deg: 0}).animate({deg: angle}, args);
    });
};

function shuffle(array)
{
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function shuffleAndCopy(array)
{
    var newArray = array.slice();
    return shuffle(newArray);
}