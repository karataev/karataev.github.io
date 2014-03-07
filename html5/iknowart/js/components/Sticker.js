/**
 * Created by postepenno on 09.02.14.
 */

var Sticker = Component.extend({

    init: function(parent, x, y, scale) {

        this.parent = parent;

        this.bitmap = new createjs.Bitmap(assets.get("sticker"));
        this.bitmap.x = x;
        this.bitmap.y = y;
        this.bitmap.regX = Sticker.WIDTH / 2;
        this.bitmap.regY = Sticker.HEIGHT / 2;
        this.bitmap.scaleX = this.bitmap.scaleY = scale;
        this.parent.addChild(this.bitmap);

    },

    setPos: function(x, y) {
        this.bitmap.x = x;
        this.bitmap.y = y;
    },

    destroy: function() {
        this.parent.removeChild(this.bitmap);
    }

});

Sticker.WIDTH = 204;
Sticker.HEIGHT = 215;