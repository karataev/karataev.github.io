/**
 * Created by postepenno on 24.03.14.
 */

var LevelFailView = ComponentBox.extend({

    init: function(game)
    {
        this.game = game;

        this._super();

        this.holder = new createjs.Container();
        this.holder.x = 50;
        this.holder.y = 330;
        Main.viewContainer.addChild(this.holder);

        this.addComponent( new Picture(this.holder, "levelFailInner", {x:0, y:0}) );
        this.addComponent( new Button(this.holder, "restartButton", this.restartClick, this, {x:110, y:90, center:true}) );

        var holderY = this.holder.y;
        this.holder.y = 500;
        createjs.Tween.get(this.holder)
            .to({y:holderY}, 1000, createjs.Ease.backOut)
    },

    restartClick: function(bt, thisRef)
    {
        var id = thisRef.game.curLevel.id;
        thisRef.game.levelAbort();
        thisRef.game.levelStart(id);
    },

    destroy: function()
    {
        this._super();

        Main.viewContainer.removeChild(this.holder);
    }


});