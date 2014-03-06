/**
 * Created by postepenno on 13.02.14.
 */


function startup()
{
    var drawfender = new Game(
        "Drawfender",
        "assets/Drawfender.png",
        "flash/drawfender",
        "Draw objects to block the attacks of two amateur assassins and to protect a famous philanthropist as he travels the world."
    );

    var nsp = new Game(
        "New Splitter Pals",
        "assets/NSP.jpg",
        "http://www.kongregate.com/games/EvgenyKarataev/new-splitter-pals",
        "Splitter Pals are back! Cut your way through 40 brand new levels and create your own with the powerful level editor!"
    );

    var wutb5 = new Game(
        "Wake Up the Box 5",
        "assets/wutb5.jpg",
        "http://www.kongregate.com/games/EvgenyKarataev/wake-up-the-box-5",
        "Those sleepy boxes are back and need to be woken up! Draw shapes on the play-field and let gravity take its course to knock the boxes awake."
    );

    var wutb4 = new Game(
        "Wake Up the Box 4",
        "assets/wutb4.jpg",
        "http://www.kongregate.com/games/EvgenyKarataev/wake-up-the-box-4",
        "Draw shapes and let gravity take it's course in order to wake up each level's box in an all new approach to the hit game series."
    );

    var wutb3 = new Game(
        "Wake Up the Box 3",
        "assets/wutb3.jpg",
        "http://www.kongregate.com/games/EvgenyKarataev/wake-up-the-box-3",
        "The Box is back and sleeping again. Find the ways to wake him up by placing objects on the playfield."
    );

    var sp = new Game(
        "Splitter Pals",
        "assets/sp.jpg",
        "http://www.kongregate.com/games/EvgenyKarataev/splitter-pals",
        "Splitter is back with his pals!"
    );

    var sticks = new Game(
        "Sticks",
        "assets/sticks.jpg",
        "http://www.kongregate.com/games/EvgenyKarataev/sticks",
        "Bob is a usual office worker who dreams about beautiful life with fascinating women, sport cars and yachts. It seems that it is undoable dream, but one day..."
    );

    var wutb2 = new Game(
        "Wake Up the Box 2",
        "assets/wutb2.png",
        "http://www.kongregate.com/games/EvgenyKarataev/wake-up-the-box-2",
        "The boxes are back, and once again sleeping! Find ways to wake them up by placing objects on the playfield."
    );
    var wtr = new Game(
        "Wake the Royalty",
        "assets/wtr.png",
        "http://www.kongregate.com/games/EvgenyKarataev/wake-the-royalty",
        "Wake the Royalty is the custom version of the game Wake Up the Box."
    );
    var wutb = new Game(
        "Wake Up the Box",
        "assets/wutb.jpg",
        "http://www.kongregate.com/games/EvgenyKarataev/wake-up-the-box",
        "Mr. Box sleeps too much. Wake him up in this physic based puzzle game."
    );
    var splitter2 = new Game(
        "Splitter 2",
        "assets/splitter2.jpg",
        "http://www.kongregate.com/games/CasualCollective/splitter-2",
        "The sequel to Splitter: Cut your way through 32 levels and then take on the 100's of player created levels or make your own!"
    );
    var gen = new Game(
        "Gen",
        "assets/gen.jpg",
        "http://www.kongregate.com/games/EvgenyKarataev/gen",
        "All of your precious spheres have been scattered far from the safety of the main sphere. It is up to you to gently guide them back."
    );
    var splitter = new Game(
        "Splitter",
        "assets/splitter.jpg",
        "http://www.kongregate.com/games/EvgenyKarataev/splitter",
        "In Splitter, each level can be solved in a number of different ways. Will you be able to come up with a brand new solution? Split the boxes and find out!"
    );
    var airbattle = new Game(
        "Air Battle",
        "assets/airbattle.jpg",
        "http://www.kongregate.com/games/EvgenyKarataev/airbattle",
        "Guide your armed balloon through twenty challenging levels. Avoid accidents and shoot down any enemy balloons you encounter."
    );

    var flashGames = [drawfender, nsp, wutb5, wutb4, wutb3, sp, sticks, wutb2, wtr, wutb, splitter2, gen, splitter, airbattle];
    for (var i = 0; i < flashGames.length; i++)
    {
        addGame(flashGames[i], "#flash");
    }


    var plusone = new Game(
        "Plus One",
        "assets/plusone.png",
        "http://postepenno.com/html5/plusone/",
        "Give your brain a workout. Counting is fun!"
    );

    addGame(plusone, "#html5");

}

function addGame(game, elem)
{
    var img = '<a href=' + game.link + ' target="_blank"><img class="thumb" src=' + game.imgSrc + ' /></a>';
    var divImg = '<div class="game-image">' + img + '</div>';

    var title = '<a  href=' + game.link + ' target="_self"><p class="game-title">' + game.title + '</p></a>';
    var desc = '<p>' + game.description + '</p>';
    var divDesc = '<div class="game-desc">' + title + desc + '</div>';

    var divGame = '<div class="game">' + divImg + divDesc + '</div>';

    $(elem).append('<hr>');
    $(elem).append(divGame);
}

function Game(title, imgSrc, link, desc)
{
    this.title = title;
    this.imgSrc = imgSrc;
    this.link = link;
    this.description = desc;
}