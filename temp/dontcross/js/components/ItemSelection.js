/**
 * Created by postepenno on 29.04.2014.
 */

var ItemSelection = Picture.extend({

    init: function(parent)
    {
        this._super(parent, "dragItemSelection", {center:true});

        this.bitmap.alpha = 0;
        createjs.Tween.get(this.bitmap)
            .to({alpha:1}, 200);

        createjs.Tween.get(this.bitmap, {loop:true})
            .to({rotation:360}, 2000)

    },

    destroy: function()
    {
        //createjs.Tween.removeTweens(this.bitmap);

        createjs.Tween.get(this.bitmap)
            .to({alpha:0}, 200)
            .call(this.realDestroy, [], this);
    },

    realDestroy: function()
    {
        this.parent.removeChild(this.bitmap);
    }

});