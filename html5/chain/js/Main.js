/**
 * Created by postepenno on 29.01.14.
 */

var gameDiv;
var canvas;
var stage;
var assets;

var Main = ComponentBox.extend({

    init: function() {

        this._super();

        gameDiv = document.getElementById("fill");
        gameDiv.setAttribute("style","width: " + Config.WIDTH + "px; height: " + Config.HEIGHT + "px; position:absolute"); // border: 5px solid #ff0000;
        canvas = document.getElementById("content");
        stage = new createjs.Stage(canvas);

        var resizer = new Resizer();

        createjs.Touch.enable(stage);
        createjs.Ticker.setFPS(60);
        //stage.mouseMoveOutside = true;
        stage.enableMouseOver(10);

        assets = new Assets(this.preloaderComplete, this);
    },

    preloaderComplete: function(thisRef) {

        if (Config.TRANSPARENT) stage.alpha = 0.5;

        createjs.Ticker.on("tick", thisRef.tick);

        Main.views = [];

        Main.backContainer = new createjs.Container();
        Main.viewContainer = new createjs.Container();
        Main.topContainer = new createjs.Container();
        Main.fpsContainer = new createjs.Container();
        stage.addChild(Main.backContainer);
        stage.addChild(Main.viewContainer);
        stage.addChild(Main.topContainer);
        stage.addChild(Main.fpsContainer);

        Fader.init();

        Main.addView( new FPSView() );

        var game = new Game();
        Main.addView( new MainMenuView(game) );

        this.addComponent( new Background() );
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
