/**
 * Created by postepenno on 31.01.14.
 */

var MainMenu = ComponentBox.extend({

    init: function() {
        this._super();

        this.addComponent( new Background() );
        this.addComponent( new Picture(Main.viewContainer, "mona", {x: 0, y:0}) );

        var title = new Picture(Main.viewContainer, "mainTitle", {x:320, y:140});
        title.bitmap.regX = 125;
        title.bitmap.regY = 125;
        this.addComponent(title);

        this.addComponent( new Picture(Main.viewContainer, "shadow", {x:0, y:710}) );

        var playButton = new Button(Main.viewContainer, "playButton", 320, 870, this.playClick, this);
        playButton.bmp.regX = playButton.bmp.regY = 75;
        createjs.Tween.get(playButton.bmp, {loop:true})
            .to({scaleX:1.1, scaleY:1.1}, 1000, createjs.Ease.sineInOut)
            .to({scaleX:1, scaleY:1}, 1000, createjs.Ease.sineInOut);

        this.addComponent(playButton);

        var creditsButton = new Button(Main.viewContainer, "creditsButton", 580, 900, this.creditsClick, this);
        creditsButton.bmp.regX = creditsButton.bmp.regY = 50;
        this.addComponent(creditsButton);
        creditsButton.hide();

        var moreGamesButton = new Button(Main.viewContainer, "moreGamesButton", 560, 870, this.moreGamesClick, this);
        moreGamesButton.bmp.regX = moreGamesButton.bmp.regY = 50;
        this.addComponent(moreGamesButton);
    },

    moreGamesClick: function()
    {
        boomerangoApi.showMoreGames();
    },

    playClick: function(bt, thisRef)
    {
        Fader.fade(thisRef.gameStart, thisRef);
    },

    creditsClick: function(bt, thisRef)
    {
        Main.addView( new Credits() );
    },

    gameStart: function() {
        Main.removeViewByClass(MainMenu);
        Main.addView( new Game() );
    }

});