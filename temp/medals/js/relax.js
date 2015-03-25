/**
 * Created by postepenno on 25.03.2015.
 */

var items;
var count;
var correctAnswers;
var headerHeight = 80;
var correctAnswer;

$(document).ready(function() {
    //console.log("hi!");

    correctAnswers = 0;

    $.getJSON("js/relax.json", function(data) {
        items = data.items;
        createTable();
        count = 1;
        showNextItem();
    });
});

function showNextItem()
{
    var $row = $(".row:nth-of-type(" + count + ")");
    //if (count > 1) $row.slideDown();
    $row.css("display", "table-row");
    correctAnswer = items[count - 1].answers[0];

    if (count > 1)
    {
        var scrollValue = $row.offset().top - headerHeight;
        //$(document).scrollTop(scrollTop);
        $("html, body").animate({scrollTop:scrollValue}, 900);
    }

}

function createTable()
{
    for (var i = 0; i < items.length; i++)
    {
        var path = "assets/images2/" + items[i].url;
        var $cell1 = $("<div class='cell for-img'><img src=" + path + "></div>");

        var hasPencil = false;
        var pencilRight = 0;
        var pencilTop = 0;
        var pencilPath = "assets/images2/empty_pencil.png";
        if (items[i].pencil) hasPencil = true;
        if (hasPencil)
        {
            pencilPath = "assets/images2/" + items[i].pencil;
            pencilRight = items[i].right;
            pencilTop = items[i].top;
        }
        var $pencilImg = $("<img class='pencil' src=" + pencilPath + ">");
        $pencilImg.css("right", pencilRight);
        $pencilImg.css("top", pencilTop);
        $cell1.append($pencilImg);

        var $cell2 = $("<div class='cell answers'></div>");
        var $ul = $("<ul></ul>");

        var answers = shuffleAndCopy(items[i].answers);
        for (var j = 0; j < answers.length; j++)
        {
            $ul.append("<li>" + answers[j] + "</li>");
        }
        $cell2.append($ul);

        var $nextHolder = $("<div class='next-holder'></div>");
        var $desc = $("<p class='item-description'>Описание</p>");
        var $nextBt = $("<button class='next'>Далее</button>");
        $nextHolder.append($desc);
        $nextHolder.append($nextBt);
        $nextHolder.css("display", "none");
        $cell2.append($nextHolder);

        var $row = $("<div class='row'></div>");
        $row.css("display", "none");
        $row.append($cell1);
        $row.append($cell2);

        $(".table").append($row);
    }

    $(".next").click(function()
    {
        $(this).hide();
        count++;
        if (count <= items.length)
        {
            showNextItem();
        }
        else
        {
            console.log("game complete!");
        }
    });

    $("li").click(function()
    {
        var userAnswer = $(this).html();
        if (userAnswer == correctAnswer)
        {
            correctAnswers++;
            $(".correctAnswers").html("Правильные ответы: " + correctAnswers);
            console.log("DA!");
        }
        else
        {
            console.log("NET!");
        }

        $(this).addClass("selected");

        var $correctLi = getCorrectLi($(this).parent());
        var $pencilImg = $(this).parent().parent().prev().children(".pencil");
        $pencilImg.fadeOut(400, function()
        {
            $correctLi.addClass("correct");
        });


        $(this).off();
        $(this).siblings().off();
        $(this).css("cursor", "auto");
        $(this).siblings().css("cursor", "auto");

        var $nextHolder = $(this).parent().next();
        setTimeout(function() {
            $nextHolder.fadeIn();
        }, 500);

    })
}

function getCorrectLi($ul)
{
    var toReturn;
    $ul.children().each(function(index) {
        var txt = $(this).html();
        //console.log(index, txt, correctAnswer, txt == correctAnswer);
        if (txt == correctAnswer)
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