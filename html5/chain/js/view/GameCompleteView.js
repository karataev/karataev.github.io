/**
 * Created by postepenno on 31.03.14.
 */

var GameCompleteView = ComponentBox.extend({

    init: function(game)
    {
        this.game = game;

        this._super();

        this.parent = Main.viewContainer;

        this.holder = new createjs.Container();
        this.holder.x = 50;
        this.holder.y = 120;
        this.parent.addChild(this.holder);

        this.addComponent( new Picture(this.holder, "gameCompleteInner") );

        this.addComponent( new Button(this.holder, "exit2Button", this.exitClick, this, {x:110, y:130, center:true}) );

        var holderY = this.holder.y;
        this.holder.y = Config.HEIGHT;
        createjs.Tween.get(this.holder)
            .to({y:holderY}, 1000, createjs.Ease.backOut);

    },

    exitClick: function(bt, thisRef)
    {
        Fader.fade(thisRef.goExit, thisRef)
    },

    goExit: function()
    {
        this.game.gameAbort();
    },

    destroy: function()
    {
        this._super();

        this.parent.removeChild(this.holder);
    }


});