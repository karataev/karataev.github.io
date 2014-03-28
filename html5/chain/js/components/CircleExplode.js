/**
 * Created by postepenno on 20.03.14.
 */

var CircleExplode = ComponentBox.extend({

    init: function(view, parent, assetName, x, y)
    {
        this._super();

        this.view = view;
        this.parent = parent;

        this.pic = new Picture(this.parent, assetName, {x:x, y:y, center:true});
        this.addComponent(this.pic);

        createjs.Tween.get(this.pic.bitmap)
            .to({scaleX:0, scaleY:0, rotation:360}, 500)
            .call(this.complete, [], this);
    },

    complete: function()
    {
        this.view.removeComponent(this);
    }

});