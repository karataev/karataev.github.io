/**
 * Created by postepenno on 13.02.14.
 */

$(document).ready(function() {
    var html5Games = [
        {
            title:"I Know Art 2",
            thumb:"assets/iknowart2.png",
            url:"http://postepenno.com/html5/iknowart2/",
            desc:"Puzzles + Art = perfect mix of fun and education."
        },
        {
            title:"Doodle Connect",
            thumb:"assets/doodleconnect.png",
            url:"http://games.softgames.de/doodle-connect/",
            desc:"Your brain is like a muscle, you need to train it to be smart. This little puzzle game is a good brain-builder!"
        },
        {
            title:"Don't Cross the Line",
            thumb:"assets/dontcross.png",
            url:"http://postepenno.com/html5/dontcross",
            desc:"Wreck your brain and untangle the lines in order to progress!"
        },
        {
            title:"Popping Pals",
            thumb:"assets/poppingpals.png",
            url:"http://postepenno.com/html5/poppingpals",
            desc:"Pop smileys and trigger chain reactions."
        },
        {
            title:"Plus One",
            thumb:"assets/plusone.png",
            url:"http://postepenno.com/html5/plusone/",
            desc:"Give your brain a workout. Counting is fun!"
        },
        {
            title:"I Know Art",
            thumb:"assets/iknowart.png",
            url:"http://postepenno.com/html5/iknowart/",
            desc:"This game offers you a fun way to develop your knowledge and demonstrate what you know about art."
        }
    ];

    var flashGames = [
        {
            title:"Mustache Time",
            thumb:"assets/mustache_time.jpg",
            url:"flash/mustache_time",
            desc:"Save mustache balls from falling outside the screen by drawing platforms. But it's not that simple. You're allowed to draw only inside specific zones, but your actions are copied outside."
        },
        {
            title:"Drawfender Level Pack",
            thumb:"assets/drawlp.jpg",
            url:"flash/drawlp",
            desc:"Draw shapes. Create constructions. Block attacks. Have fun!"
        },
        {
            title:"Drawfender",
            thumb:"assets/Drawfender.png",
            url:"flash/drawfender",
            desc:"Draw objects to block the attacks of two amateur assassins and to protect a famous philanthropist as he travels the world."
        },
        {
            title:"New Splitter Pals",
            thumb:"assets/NSP.jpg",
            url:"flash/nsp",
            desc:"Splitter Pals are back! Cut your way through 40 brand new levels and create your own with the powerful level editor!"
        },
        {
            title:"Wake Up the Box 5",
            thumb:"assets/wutb5.jpg",
            url:"flash/wutb5",
            desc:"Those sleepy boxes are back and need to be woken up! Draw shapes on the play-field and let gravity take its course to knock the boxes awake."
        },
        {
            title:"Wake Up the Box 4",
            thumb:"assets/wutb4.jpg",
            url:"flash/wutb4",
            desc:"Draw shapes and let gravity take it's course in order to wake up each level's box in an all new approach to the hit game series."
        },
        {
            title:"Wake Up the Box 3",
            thumb:"assets/wutb3.jpg",
            url:"flash/wutb3",
            desc:"The Box is back and sleeping again. Find the ways to wake him up by placing objects on the playfield."
        },
        {
            title:"Splitter Pals",
            thumb:"assets/sp.jpg",
            url:"flash/sp",
            desc:"Splitter is back with his pals!"
        },
        {
            title:"Sticks",
            thumb:"assets/sticks.jpg",
            url:"flash/sticks",
            desc:"Bob is a usual office worker who dreams about beautiful life with fascinating women, sport cars and yachts. It seems that it is undoable dream, but one day..."
        },
        {
            title:"Wake Up the Box 2",
            thumb:"assets/wutb2.png",
            url:"flash/wutb2",
            desc:"The boxes are back, and once again sleeping! Find ways to wake them up by placing objects on the playfield."
        },
        {
            title:"Wake the Royalty",
            thumb:"assets/wtr.png",
            url:"flash/wtr",
            desc:"Wake the Royalty is the custom version of the game Wake Up the Box."
        },
        {
            title:"Wake Up the Box",
            thumb:"assets/wutb.jpg",
            url:"flash/wutb",
            desc:"Mr. Box sleeps too much. Wake him up in this physic based puzzle game."
        },
        {
            title:"Splitter 2",
            thumb:"assets/splitter2.jpg",
            url:"flash/splitter2",
            desc:"The sequel to Splitter: Cut your way through 32 levels and then take on the 100's of player created levels or make your own!"
        },
        {
            title:"Gen",
            thumb:"assets/gen.jpg",
            url:"flash/gen",
            desc:"All of your precious spheres have been scattered far from the safety of the main sphere. It is up to you to gently guide them back."
        },
        {
            title:"Splitter",
            thumb:"assets/splitter.jpg",
            url:"flash/splitter",
            desc:"In Splitter, each level can be solved in a number of different ways. Will you be able to come up with a brand new solution? Split the boxes and find out!"
        },
        {
            title:"Air Battle",
            thumb:"assets/airbattle.jpg",
            url:"flash/airbattle",
            desc:"Guide your armed balloon through twenty challenging levels. Avoid accidents and shoot down any enemy balloons you encounter."
        }
    ];

    var theTemplateScript = $("#game-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    //console.log(theTemplate);

    $(".html5").append (theTemplate(html5Games));
    $(".flash").append (theTemplate(flashGames));
});
