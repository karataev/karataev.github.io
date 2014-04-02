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
            this.addComponent( new TextField(this.holder, txt, {align:"center", baseline:"middle", color:textColor, font:"30px Ceviche One"}) );
        }
        else
        {
            this.addComponent( new Picture(this.holder, "levelItemLockedBack", {center:true}) );
        }
    },

    click: function(bt, thisRef)
    {
        Fader.fade(thisRef.levelStart, thisRef);
    },

    levelStart: function()
    {
        Main.removeViewByClass(LevelSelectView);
        this.game.levelStart(this.level.id);
    },

    destroy: function()
    {
        this._super();

        this.parent.removeChild(this.holder);
    }

});