/**
 * Created by postepenno on 24.03.14.
 */

var LevelCompleteView = ComponentBox.extend({

    init: function(game)
    {
        this.game = game;

        this._super();

        this.holder = new createjs.Container();
        this.holder.x = 50;
        this.holder.y = 330;
        Main.viewContainer.addChild(this.holder);

        this.addComponent( new Picture(this.holder, "levelCompleteInner", {x:0, y:0}) );
        this.addComponent( new Button(this.holder, "nextButton", this.nextClick, this, {x:110, y:90, center:true}) );

        var holderY = this.holder.y;
        this.holder.y = 500;
        createjs.Tween.get(this.holder)
            .to({y:holderY}, 1000, createjs.Ease.backOut)
    },

    nextClick: function(bt, thisRef)
    {
        thisRef.game.levelNext();
    },

    destroy: function()
    {
        this._super();

        Main.viewContainer.removeChild(this.holder);
    }


});