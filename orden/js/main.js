/**
 * Created by postepenno on 30.03.2015.
 */

var gameData;
var count;
var SHOW_ALL = false;
var correctAnswers;

$(document).ready(function() {

    $.getJSON("js/data.json", function(data) {

        gameData = data.items;
        //gameData = data.items.slice(0, 1);
        createTable();

        var $start = $(".start");
        $start.click(function() {
            $(this).hide();
            count = 0;
            correctAnswers = 0;
            showNextItem();
        })

    });


});

function showNextItem()
{
    var $row = $(".row:nth-of-type(" + (count + 1) + ")");
    //var $row = $(".row");
    $row.fadeIn(1000);

    var scrollValue = $row.offset().top;
    $("html, body").animate({scrollTop:scrollValue}, 900);
}


function createTable()
{
    for (var i = 0; i < gameData.length; i++)
    {
        var itemData = gameData[i];
        itemData.correctAnswer = itemData.answers[0];
        shuffle(itemData.answers);

        if (!itemData.pencil)
        {
            itemData.pencil = "empty_pencil.png";
            itemData.right = 0;
            itemData.top = 0;
        }

        //console.log(gameData[i].answers);
    }


    var theTemplateScript = $("#header").html();
    var theTemplate = Handlebars.compile(theTemplateScript);

    $(".table").append (theTemplate (gameData));

    $(".next").click(function()
    {
        $(this).hide();
        count++;
        if (count < gameData.length)
        {
            showNextItem();
        }
        else
        {
            gameComplete();
        }
    });


    $("li").click(function() {
        var playerAnswer = $(this).html();
        var correctAnswer = gameData[count].correctAnswer;
        if (playerAnswer == correctAnswer)
        {
            correctAnswers++;
        }
        else
        {
            //console.log("wrong!");
        }

        $(this).addClass("selected");

        $(this).off();
        $(this).siblings().off();
        $(this).css("cursor", "auto");
        $(this).siblings().css("cursor", "auto");

        var $correctLi = getCorrectLi($(this).parent());
        var $pencilImg = $(this).parent().parent().prev().children(".pencil");
        $pencilImg.fadeOut(400, function()
        {
            $correctLi.addClass("correct");
        });

        var $nextHolder = $(this).parent().next();
        setTimeout(function() {
            $nextHolder.fadeIn();
        }, 500);


    });

    if (!SHOW_ALL)
    {
        $(".next-holder").css("display", "none");
        $(".row").css("display", "none");
    }
}

function gameComplete()
{
    var comment = "";
    var errors = gameData.length - correctAnswers;
    if (errors == 0) comment = "Поздравляю! Ни одной ошибки! Орден этому господину!";
    else if (errors == 1) comment = "Всего одна ошибочка. Так скажу: зачем мне орден? Я согласен на медаль.";
    else if (errors == 2) comment = "Две ошибки. Хороший результат, поздравляю!";
    else if (errors == 3) comment = "Три ошибки. Это норма (с)";
    else if (errors == 4) comment = "Четыре ошибки. По статистике лишь небольшой процент пользователей проходит этот тест без ошибок с первого раза.";
    else if (errors >= 5) comment = "Увы, пять ошибок или больше. Попробуй еще раз.";

    var data = {comment:comment};
    var theTemplateScript = $("#gameComplete").html();
    var theTemplate = Handlebars.compile(theTemplateScript);

    $(".content").append(theTemplate(data));

    var $gameComplete = $(".game-complete");
    $gameComplete.css("display", "none");
    $gameComplete.fadeIn(1000);

    var scrollValue = $gameComplete.offset().top;
    $("html, body").animate({scrollTop:scrollValue}, 900);

    $(".restart").click(function() {
        location.reload();
    });

}

function getCorrectLi($ul)
{
    var toReturn;
    $ul.children().each(function(index) {
        var txt = $(this).html();
        //console.log(index, txt, correctAnswer, txt == correctAnswer);
        if (txt == gameData[count].correctAnswer)
        {
            toReturn = $(this);
            return false;
        }
    });
    return toReturn;
}



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