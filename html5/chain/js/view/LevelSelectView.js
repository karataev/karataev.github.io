/**
 * Created by postepenno on 31.01.14.
 */

var LevelSelectView = ComponentBox.extend({

    init: function(game) {

        this.game = game;

        this._super();

        //this.addComponent( new Background() );

        this.addComponent( new Picture(Main.viewContainer, "levelSelectTitle", {x:0, y:10}) );

        var homeButton = new Button(Main.viewContainer, "homeButton", this.homeClick, this, {x:35, y:35, center:true});
        this.addComponent(homeButton);

        for (var i = 0; i < this.game.levels.length; i++)
        {
            var level = this.game.levels[i];
            var px = 40 + i % 5 * 60;
            var py = 100 + Math.floor(i / 5) * 60;
            var item = new LevelItem(this.game, Main.viewContainer, level, px, py);
            this.addComponent(item);
        }

    },

    homeClick: function(bt, thisRef)
    {
        Main.removeViewByClass(LevelSelectView);
        Main.addView( new MainMenuView(thisRef.game) );
    },

    gameStart: function()
    {
        Main.removeViewByClass(MainMenuView);
        this.game.levelStart(0);
    }


});