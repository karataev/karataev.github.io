/**
 * Created by postepenno on 12.05.2014.
 */

var NewRecord = ComponentBox.extend({

    init: function(game, parent)
    {
        this.game = game;
        this.parent = parent;

        this._super();

        this.startX = 180;
        this.startY = 20;
        this.pic = new Picture(this.parent, "newRecord", {x:this.startX, y:this.startY});
        this.addComponent(this.pic);

        this.pic.bitmap.alpha = 0;
        createjs.Tween.get(this.pic.bitmap)
            .to({alpha:1}, 500, createjs.Ease.linear);


        createjs.Tween.get(this.pic.bitmap, {loop:true})
            .to({x:this.startX + 10}, 800, createjs.Ease.sineInOut)
            .to({x:this.startX}, 800, createjs.Ease.sineInOut);


    },

    destroy: function()
    {
        createjs.Tween.removeTweens(this.pic.bitmap);

        this._super();
    }

});