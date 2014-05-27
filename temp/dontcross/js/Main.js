/**
 * Created by postepenno on 29.01.14.
 */

var gameDiv;
var canvas;
var stage;
var assets;
var cookies;

var Main = ComponentBox.extend({

    init: function() {

        this._super();

        this.zzz = "Boo!";

        gameDiv = document.getElementById("gameArea");
        canvas = document.getElementById("gameCanvas");
        stage = new createjs.Stage(canvas);

        var resizer = new Resizer();

        createjs.Touch.enable(stage, true);
        createjs.Ticker.setFPS(30);
        stage.mouseMoveOutside = true;
        stage.enableMouseOver(10);

        this.counter = 0;
        createjs.Ticker.on("tick", this.tick, this);

        cookies = new Cookies();

        assets = new Assets(this.preloaderComplete, this);

        console.log("ZZZ");
    },

    testFunc:function(name, profession)
    {
        console.log("Name " + name + ", profession " + profession + ". " + this.zzz);
    },

    preloaderComplete: function() {

        if (Config.TRANSPARENT) stage.alpha = 0.5;

        Main.views = [];

        Main.backContainer = new createjs.Container();
        Main.viewContainer = new createjs.Container();
        Main.topContainer = new createjs.Container();
        Main.faderContainer = new createjs.Container();
        stage.addChild(Main.backContainer);
        stage.addChild(Main.viewContainer);
        stage.addChild(Main.topContainer);
        stage.addChild(Main.faderContainer);

        Fader.init();

        if (Config.SHOW_FPS) Main.addView( new FPSView() );

        this.back = new Background();
        this.addComponent(this.back);

        var game = new Game();
        cookies.assignGame(game);

        Main.addView( new MainMenuView(game) );
        Sounds.startMusic();

        $(window).on("blur", $.proxy(this.onBlur, this));
        $(window).on("focus", $.proxy(this.onFocus, this) );

    },

    onBlur: function() {
        if (Main.FOCUS) {
            Main.FOCUS = false;
            Sounds.stopMusic();
        }
    },

    onFocus: function() {
        if (Main.FOCUS == false) {
            Main.FOCUS = true;
            Sounds.startMusic();
        }
    },


    tick: function(event) {
        stage.update(event);

        this.counter++;
        if (this.counter >= 30)
        {
            this.counter = 0;
            //console.log("TICK!");
        }
    }
});

Main.FOCUS = true;

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
