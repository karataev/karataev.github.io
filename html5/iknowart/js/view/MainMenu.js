/**
 * Created by postepenno on 31.01.14.
 */

var MainMenu = ComponentBox.extend({

    init: function() {
        this._super();

        this.addComponent( new Background() );
        this.addComponent( new Picture(Main.viewContainer, "mona", {x: 0, y:0}) );

        this.addComponent( new Picture(Main.viewContainer, "mainTitle", {x:0, y:0}) );
        this.addComponent( new Button(Main.viewContainer, "playButton", 160, 110, this.playClick, this) );
    },

    playClick: function(bt, thisRef)
    {
        Main.removeViewByClass(MainMenu);
        Main.addView( new Game() );
    }

});