/**
 * Created by postepenno on 09.04.2015.
 */

var clickEnabled;
var activeCell1;
var activeCell2;
var time = 500;

$(document).ready(function() {

    createGrid();

    clickEnabled = true;
    $(".card").click(cellClick);
});

function cellClick()
{
    //console.log("yo!");
    if (!clickEnabled) return;

    if (activeCell1)
    {
        activeCell2 = $(this);
        activeCell2.off();
        clickEnabled = false;
        $(this).transition({rotateY:"180deg"}, time, checkCells);
    }
    else
    {
        activeCell1 = $(this);
        activeCell1.off();
        $(this).transition({rotateY:"180deg"}, time);
    }

}

function checkCells()
{
    var content1 = activeCell1.find(".back").html();
    var content2 = activeCell2.find(".back").html();
    if (content1 === content2)
    {
        activeCell1 = undefined;
        activeCell2 = undefined;
        clickEnabled = true;
    }
    else
    {
        activeCell1.transition({rotateY:"0deg"}, time);
        activeCell2.transition({rotateY:"0deg"}, time);
        activeCell1.on("click", cellClick);
        activeCell2.on("click", cellClick);
        activeCell1 = undefined;
        activeCell2 = undefined;
        clickEnabled = true;
    }

}

function createGrid()
{
    var i;
    var cellsNum = 16;
    var data = [];
    var images = [];
    var imgId = ["01", "11", "12", "15", "33", "35", "41", "48"];
    for (i = 0; i < cellsNum / 2; i++)
    {
        data[i*2] = {value:i, img:"assets/images/smiley" + imgId[i] + ".png"};
        data[i*2 + 1] = {value:i, img:"assets/images/smiley" + imgId[i] + ".png"};
    }
    shuffle(data);

    var $grid = $(".grid");
    //background:#fff url("../assets/images/smiley01.png");
    for (i = 0; i < cellsNum; i++)
    {
        var $front = $("<div class='front'>?</div>");
        var $back = $("<div class='back'>" + data[i].value + "</div>");
        $back.css("background-image", "url(" + data[i].img + ")");
        var $card = $("<li class='card'></li>");
        $card.append($front);
        $card.append($back);
/*
        var $card = $("<li class='card'>" +
        "<div class='front'>?</div>" +
        "<div class='back'>" + title + "</div>" +
        "</li>");
*/
        $grid.append($card);
    }
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