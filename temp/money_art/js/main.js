/**
 * Created by postepenno on 27.04.2015.
 */

var items;
var items1;
var items2;
var count;

$(document).ready(function() {

    $.getJSON("js/data2.json", function(data) {
        //console.log("json loaded!", data.items.length);
        items = data.items;
        count = 0;
        //console.log(items.items1[0].title);
        nextLevel();
    });

});

function nextLevel() {

    var theTemplateScript = $("#section-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $(".wrapper").append (theTemplate (items));

    $(".price").css("opacity", 0);

    $(".section").click(function() {
        $(this).find(".price").css("opacity", 1);
    });

/*
    var data1 = items1[count];
    var data2 = items2[count];

    var $item1 = $(".cell:first-of-type");
    var $item2 = $(".cell:last-of-type");

    var url1 = "url(img/" + data1.url + ")";
    var url2 = "url(img/" + data2.url + ")";
    $item1.children(".photo-img").css("background-image", url1);
    $item2.children(".photo-img").css("background-image", url2);

    $item1.children(".title").html(data1.title);
    $item2.children(".title").html(data2.title);

    $item1.children(".price").html(data1.price);
    $item2.children(".price").html(data2.price);
*/
}



