/**
 * Created by postepenno on 17.03.14.
 */

var Bullet = ComponentBox.extend({

    init: function(game, view, parent, x, y, dx, dy)
    {
        this.game = game;
        this.view = view;
        this.parent = parent;
        this.x = x;
        this.y = y;

        this.dx = dx;
        this.dy = dy;

        this._super();

        this.pic = new Picture(this.parent, "bullet", {x:x, y:y, center:true});
        this.addComponent(this.pic);

    },

    update: function()
    {
        this.x += this.dx;
        this.y += this.dy;

        this.pic.setPos(this.x, this.y);

        var w = Config.WIDTH;
        var h = Config.HEIGHT;
        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h)
        {
            this.game.bulletOutOfBounds(this);
        }
    },

    destroy: function()
    {
        this._super();
    }


});