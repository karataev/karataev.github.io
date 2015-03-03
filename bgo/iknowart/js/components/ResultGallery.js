/**
 * Created by postepenno on 10.03.14.
 */

var ResultGallery = ComponentBox.extend({

    init: function(parent, game, x, y)
    {
        this._super();

        this.parent = parent;
        this.game = game;

        this.container = new createjs.Container();
        this.container.x = x;
        this.container.y = y;
        this.parent.addChild(this.container);

        var w = 96;
        var h = 106;

        var g = new createjs.Graphics();
        g.beginFill("#FFF").drawRect(-5, -5, w * 5 + 10, h * 4 + 10);
        this.shape = new createjs.Shape(g);
        this.container.addChild(this.shape);


        for (var i = 0; i < this.game.levels.length; i++) {
            var level = this.game.levels[i];
            var px = (i % 5) * w;
            var py = Math.floor(i / 5) * h;
            var item = new GalleryItem(this.container, level, px, py);
            this.addComponent(item);
        }

        //this.pic = new Picture(this.parent, "resultGallery", {x:x, y:y});
        //this.addComponent(this.pic);
    },

    destroy: function()
    {
        this._super();

        this.parent.removeChild(this.container);
    }

});