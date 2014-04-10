/**
 * Created by postepenno on 16.01.14.
 */

var loader;
var loaderBar;

var gameDiv;
var canvas;
var stage;

var cardImages;
var startFrames;
var finalFrames;
var currentState;

var welcomeCount = 0;
var mobile;

function startup() {
    gameDiv = document.getElementById("fill");
    gameDiv.setAttribute("style","width: 320px; height: 480px; position:absolute"); // border: 5px solid #ff0000;

    canvas = document.getElementById("content");
    stage = new createjs.Stage(canvas);

    window.onresize = function() { onResize(); };
    onResize();

    mobile = new Mobile();

    loadAssets();
}

function loadAssets() {
    loader = new createjs.LoadQueue(false);

    loaderBar = new createjs.Shape();
    loaderBar.graphics.beginFill("#000000").drawRect(0, 230, 320, 20).endFill();
    loaderBar.scaleX = 0;
    stage.addChild(loaderBar);

    var manifest = [
        {id:"background", src:"assets/Background.jpg"},

        // Welcome
        {id:"playButton", src:"assets/StartButton.png"},
        {id:"creditsButton", src:"assets/CreditsButton.png"},
        {id:"moreGamesButton", src:"assets/MoreGamesButton.png"},
        {id:"welcomeTitle", src:"assets/WelcomeTitle.png"},

        // Remember
        {id:"rememberButton", src:"assets/RememberButton.png"},
        {id:"rememberTitle", src:"assets/RememberTitle1.png"},
        {id:"8bubn", src:"assets/Card8bubn.png"},
        {id:"8cherv", src:"assets/Card8cherv.png"},
        {id:"8krest", src:"assets/Card8krest.png"},
        {id:"8pik", src:"assets/Card8pik.png"},
        {id:"9bubn", src:"assets/Card9bubn.png"},
        {id:"9cherv", src:"assets/Card9cherv.png"},
        {id:"9krest", src:"assets/Card9krest.png"},
        {id:"9pik", src:"assets/Card9pik.png"},
        {id:"10bubn", src:"assets/Card10bubn.png"},
        {id:"10cherv", src:"assets/Card10cherv.png"},
        {id:"10krest", src:"assets/Card10krest.png"},
        {id:"10pik", src:"assets/Card10pik.png"},

        // Brainwash
        {id:"repeatButton", src:"assets/RepeatButton.png"},
        {id:"brainwashTitle1", src:"assets/BrainwashTitle1.png"},
        {id:"brainwashTitle2", src:"assets/BrainwashTitle2.png"},
        {id:"spiral", src:"assets/spiral2.png"},

        // Surprise
        {id:"againButton", src:"assets/AgainButton.png"},
        {id:"surpriseTitle", src:"assets/SurpriseTitle.png"},

        // Credits
        {id:"creditsTitle", src:"assets/CreditsTitle.png"},
        {id:"backButton", src:"assets/BackButton.png"}
    ]

    loader.on("fileload", handleFileLoad, this);
    loader.on("complete", handleComplete, this);
    loader.loadManifest(manifest);

}

function handleFileLoad(event) {
    var progress = Math.round(loader.progress * 100);
    //console.log(progress);
    loaderBar.scaleX = loader.progress;
    stage.update();
}

function handleComplete(event) {
    stage.removeChild(loaderBar);
    stage.update();

    console.log("load complete!");
    gameStart();
}


function gameStart() {

    cardImages = ['10bubn', '10cherv', '10pik', '10krest', '9bubn', '9cherv', '9pik', '9krest', '8bubn', '8cherv', '8pik', '8krest'];

    brandImage = new createjs.DOMElement("brand");
    brandImage.htmlElement.setAttribute('src', fgl.getBrandingLogo());

    brandContainer = new createjs.Container();
    brandContainer.x = 35;
    brandContainer.y = 370;

    stage.addChild(brandContainer);
    brandContainer.addChild(this.brandImage);


    currentState = new WelcomeState();

    createjs.Touch.enable(stage);
    createjs.Ticker.setFPS(30);
    stage.mouseMoveOutside = true;

    createjs.Ticker.on("tick", tick);

}

function tick() {
    currentState.update();
    stage.update();
}

function startRound() {
    var rand = Math.random();
    if (rand > 0.5) {
        startFrames = [1, 3, 6, 8, 9, 11];
        finalFrames = [2, 4, 5, 7, 10, 12];
    }
    else {
        startFrames = [2, 4, 5, 7, 10, 12];
        finalFrames = [1, 3, 6, 8, 9, 11];
    }

    //console.log("new round!");

}


if (typeof Function.prototype.bind != 'function') {
    Function.prototype.bind = (function () {
        var slice = Array.prototype.slice;
        return function (thisArg) {
            var target = this, boundArgs = slice.call(arguments, 1);
            if (typeof target != 'function') {
                throw new TypeError();
            }
            function bound() {
                var args = boundArgs.concat(slice.call(arguments));
                target.apply(this instanceof bound ? this : thisArg, args);
            }
            bound.prototype = (function F(proto) {
                proto && (F.prototype = proto);
                if (!(this instanceof F)) {
                    return new F;
                }
            })(target.prototype);
            return bound;
        };
    })();
}