/**
 * Created by postepenno on 24.03.14.
 */

var LevelCompleteView = Dialog.extend({

    init: function(game)
    {
        this._super(game, Main.viewContainer, {asset:"levelCompleteBack", x:100, y:400, blockBack:false});

        this.nextButton = new Button(this.holder, "nextButton", this.nextClick, this, {x:220, y:180, center:true});
        this.addComponent(this.nextButton);
        createjs.Tween.get(this.nextButton.bmp, {loop:true})
            .to({scaleX:1.2, scaleY:1.2}, 1000, createjs.Ease.sineInOut)
            .to({scaleX:1, scaleY:1}, 1000, createjs.Ease.sineInOut);
    },

    nextClick: function(bt)
    {
        this.game.levelNext();
    },

    destroy: function()
    {
        createjs.Tween.removeTweens(this.nextButton.bmp);

        this._super();
    }

});