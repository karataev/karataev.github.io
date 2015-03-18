/**
 * Created by postepenno on 18.03.2015.
 */

var $buttons;
var $comment;
var numbers;
var index;
var sndCorrect;
var sndWrong;
var levels;
var levelIndex;
var curLevel;

$(document).ready(function() {
    $buttons = $(".buttons");
    $comment = $(".comment");

    $.getJSON("js/data.json", function(data) {
        levels = data.levels;

        initSounds();

        $("#restart").click(function() {
            clear();
            $comment.html("");
            startGame();
        });

        clear();
        startGame();
    });
});

function initSounds()
{
    sndCorrect = document.createElement('audio');
    sndCorrect.setAttribute('src', 'assets/sndCorrect.mp3');
    sndWrong = document.createElement('audio');
    sndWrong.setAttribute('src', 'assets/sndWrong.mp3');
    $.get();
}

function startGame()
{
    levelIndex = 0;

    levelStart();
}

function levelStart()
{
    curLevel = levels[levelIndex];

    var i;
    numbers = [];
    for (i = 0; i < curLevel.qt; i++)
    {
        numbers.push(i + 1);
    }

    index = 0;

    var shuffled = shuffleAndCopy(numbers);
    for (i = 0; i < shuffled.length; i++)
    {
        $buttons.append('<a href="#" class="btn">' + shuffled[i] + '</a>');
    }
    $(".btn").click(function() {
        var value = $(this).html();
        if (value == numbers[index])
        {
            $comment.append(" " + value);
            $(this).removeClass("btn");
            $(this).addClass("btn-off");
            $(this).off();

            sndCorrect.play();

            index++;
            if (index == numbers.length)
            {
                levelComplete();
            }
        }
        else
        {
            sndWrong.play();
        }
    });
}

function levelComplete()
{
    $comment.append("<br>Уровень пройден!<br>");

    levelIndex++;
    if (levelIndex == levels.length)
    {
        $comment.append("Игра пройдена!<br>");
    }
    else
    {
        clear();
        levelStart();
    }

}

function clear() {
    $buttons.html("");
    //$comment.html("");
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