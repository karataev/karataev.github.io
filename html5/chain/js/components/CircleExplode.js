/**
 * Created by postepenno on 20.03.14.
 */

var CircleExplode = ComponentBox.extend({

    init: function(view, parent, assetName, x, y)
    {
        this._super();

        this.view = view;
        this.parent = parent;

        this.holder = new createjs.Container();
        this.holder.x = x;
        this.holder.y = y;
        this.parent.addChild(this.holder);

        this.pic = new Picture(this.holder, assetName, {x:0, y:0, center:true});
        this.addComponent(this.pic);

        this.addComponent( new Picture(this.holder, "eyesStatic", {x:0, y:0, center:true}) );
        //this.addComponent( new Eyes(this.holder, -Config.CIRCLE_RADIUS, -Config.CIRCLE_RADIUS, false) );

        createjs.Tween.get(this.holder)
            .to({scaleX:0, scaleY:0, rotation:360}, 500)
            .call(this.complete, [], this);
    },

    complete: function()
    {
        this.view.removeComponent(this);
    },

    destroy: function()
    {
        this._super();

        this.parent.removeChild(this.holder);
    }

});