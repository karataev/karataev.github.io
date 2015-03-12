/**
 * Created by postepenno on 29.01.14.
 */

var gameDiv;
var canvas;
var stage;
var assets;

var Main = Class.extend({

    init: function() {
        gameDiv = document.getElementById("gameArea");
        //gameDiv.setAttribute("style","width: " + Config.WIDTH + "px; height: " + Config.HEIGHT + "px; position:absolute"); // border: 5px solid #ff0000;
        canvas = document.getElementById("gameCanvas");
        stage = new createjs.Stage(canvas);

        var resizer = new Resizer();

        createjs.Touch.enable(stage);
        createjs.Ticker.setFPS(60);
        //stage.mouseMoveOutside = true;
        stage.enableMouseOver(10);

        // initialize with callbacks!
        boomerangoApi.initialize({soundMuteCallback:Sounds.mute, soundUnmuteCallback:Sounds.unmute});

        assets = new Assets(this.preloaderComplete, this);
    },

    preloaderComplete: function(thisRef) {

        if (Config.TRANSPARENT) stage.alpha = 0.5;

        //Sounds.startMusic();
        createjs.Ticker.on("tick", thisRef.tick);

        Main.views = [];

        Main.viewContainer = new createjs.Container();
        Main.topContainer = new createjs.Container();
        Main.fpsContainer = new createjs.Container();
        stage.addChild(Main.viewContainer);
        stage.addChild(Main.topContainer);
        stage.addChild(Main.fpsContainer);

        Fader.init();

        //Main.addView( new FPSView() );
        Main.addView( new MainMenu() );
    },

    tick: function(event) {
        stage.update(event);
    }
});


Main.addView = function(view) {
    //console.log("added view", view);
    Main.views.push(view);
};

Main.removeViewByClass = function(ViewClass) {
    for (var i = Main.views.length - 1; i >= 0; i--) {
        var view = Main.views[i];
        if (view instanceof ViewClass) {
            //console.log("remove view", view);
            Main.views.splice(i, 1);
            view.destroy();
            break;
        }
    }
};

Main.getViewByClass = function(ViewClass) {
    for (var i = Main.views.length - 1; i >= 0; i--) {
        var view = Main.views[i];
        if (view instanceof ViewClass)
        {
            return view;
        }
    }
    return null;
};