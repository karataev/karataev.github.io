/**
 * Created by postepenno on 31.01.14.
 */

var MainMenuView = ComponentBox.extend({

    init: function(game) {

        this.game = game;

        this._super();

        //this.addComponent( new Background() );

        this.addComponent( new Picture(Main.viewContainer, "gameTitle", {x:0, y:20}) );

        var playButton = new Button(Main.viewContainer, "playButton", this.playClick, this, {x:160, y:240, center:true});
        createjs.Tween.get(playButton.bmp, {loop:true})
            .to({scaleX:1.1, scaleY:1.1}, 1000, createjs.Ease.sineInOut)
            .to({scaleX:1, scaleY:1}, 1000, createjs.Ease.sineInOut);

        this.addComponent(playButton);

        this.addComponent( new SoundIcon(this.game, Main.viewContainer, 130, 410) );

        // null text font!
        var verTxt = "v " + Config.VERSION;
        this.addComponent( new TextField(Main.viewContainer, verTxt, {color:"#FFFFFF", font:"10px Ceviche One"}) );


        this.addComponent( new Button(Main.viewContainer, "restartButton", this.clearProgressClick, this, {x:280, y:440, center:true}) );
        this.addComponent( new Button(Main.viewContainer, "creditsButton", this.creditsClick, this, {x:40, y:440, center:true}) );
    },

    creditsClick: function(bt, thisRef)
    {
        Main.addView( new CreditsView(thisRef.game) );
    },

    clearProgressClick: function(bt, thisRef)
    {
        Main.addView( new DeleteProgressView(thisRef.game) );
    },

    playClick: function(bt, thisRef)
    {
        Fader.fade(thisRef.gameStart, thisRef);
        //thisRef.gameStart();
    },

    gameStart: function()
    {
        Main.removeViewByClass(MainMenuView);
        Main.addView( new LevelSelectView(this.game) );
        //this.game.levelStart(0);
    }


});