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
        this.addComponent( new Button(Main.viewContainer, "playButton", 170, 850, this.playClick, this) );
    },

    playClick: function(bt, thisRef)
    {
        Fader.fade(thisRef.gameStart, thisRef);
    },

    gameStart: function() {
        Main.removeViewByClass(MainMenu);
        Main.addView( new Game() );
    }

});