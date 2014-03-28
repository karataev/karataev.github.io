/**
 * Created by postepenno on 31.01.14.
 */

var MainMenuView = ComponentBox.extend({

    init: function(game) {

        this.game = game;

        this._super();

        //this.addComponent( new Background() );

        var playButton = new Button(Main.viewContainer, "playButton", this.playClick, this, {x:160, y:240, center:true});
        createjs.Tween.get(playButton.bmp, {loop:true})
            .to({scaleX:1.1, scaleY:1.1}, 1000, createjs.Ease.sineInOut)
            .to({scaleX:1, scaleY:1}, 1000, createjs.Ease.sineInOut);

        this.addComponent(playButton);

        this.addComponent( new SoundIcon(Main.viewContainer, 130, 400) );

        // null text font!
        this.addComponent( new TextField(Main.viewContainer, "v 0.9", {color:"#FFFFFF", font:"10px Ceviche One"}) );
    },

    playClick: function(bt, thisRef)
    {
        //Fader.fade(thisRef.gameStart, thisRef);
        thisRef.gameStart();
    },

    gameStart: function()
    {
        Main.removeViewByClass(MainMenuView);
        Main.addView( new LevelSelectView(this.game) );
        //this.game.levelStart(0);
    },


    creditsClick: function(bt, thisRef)
    {
        Main.addView( new Credits() );
    }

});