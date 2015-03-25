/**
 * Created by postepenno on 24.03.2015.
 */


var images = [
    "orden_pobeda.jpg",
    "orden_lenina.jpg",
    "orden_glory1.jpg",
    "orden_suvorova1.jpg",
    "orden_ushakova.jpg",
    "orden_kutuzova1.jpg",
    "orden_nahimova1.jpg",
    "orden_bogdan.jpg",
    "orden_nevskogo.jpg",
    "orden_war.jpg",
    "orden_red_znamya.jpg",
    "orden_red_star.jpg"
    ];

var counter;

$(document).ready(function() {

    var $holder = $(".holder");
    for (var i = 0; i < images.length; i++)
    {
        var path = "assets/images2/" + images[i];
        var $img = $("<img src=" + path + ">");
        $holder.append($img);
        //console.log($img);
        $img.css("display", "none");
    }

    $("img:first-of-type").css("display", "block");
    counter = 0;

    $("img").click(function() {
        $(this).off();
        $(this).css("cursor", "auto");

        counter++;
        var $next = $(this).next();

        if (counter < images.length)
        {
            $next.slideDown();
            $next.css("display", "block");
            var scrollValue = $next.offset().top;
            //$(document).scrollTop(scrollTop);
            $("html, body").animate({scrollTop:scrollValue}, 900);
            //$next.animate({opacity:0.25}, 1000);
        }
        else
        {
            console.log("game complete!");
        }

    });
});