/**
 * Created by postepenno on 25.03.14.
 */

var LevelItem = ComponentBox.extend({

    init: function(game, parent, level, x, y)
    {
        this.game = game;
        this.parent = parent;
        this.level = level;

        this._super();

        this.holder = new createjs.Container();
        this.holder.x = x;
        this.holder.y = y;
        this.parent.addChild(this.holder);

        if (level.isOpen)
        {
            var textColor = "#000000"; //
            var backAssetName;
            if (level.isCompleted) {
                backAssetName = "levelItemCompleteBack";
                textColor = "#39541D";

            }
            else {
                backAssetName = "levelItemBack";
                textColor = "#212A56";
            }
            this.addComponent( new Button(this.holder, backAssetName, this.click, this, {center:true}) );
            var txt = this.level.id + 1;
            this.addComponent( new TextField(this.holder, txt, {align:"center", baseline:"middle", color:textColor, font:"50px Arial"}) );
        }
        else
        {
            this.addComponent( new Picture(this.holder, "levelItemLockedBack", {center:true}) );
        }

        if (level.isOpen && level.isCompleted)
        {
            //Util.formatTime()

            var bestTimeStr = Util.formatTime(this.level.bestTime);
            var bestTimeTf = new TextField(this.holder, bestTimeStr, {y:25, align:"center", color:textColor, font:"16px Arial"});
            this.addComponent(bestTimeTf);
        }

    },

    click: function(bt)
    {
        Fader.fade(this.levelStart, this);
    },

    levelStart: function()
    {
        Main.removeViewByClass(LevelSelectView);
        this.game.levelStartByID(this.level.id);
    },

    destroy: function()
    {
        this._super();

        this.parent.removeChild(this.holder);
    }

});