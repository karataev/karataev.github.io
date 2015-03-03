/**
 * Created by postepenno on 09.02.14.
 */

var Painting = ComponentBox.extend({

    init: function(parent, level) {

        this._super();

        this.parent = parent;
        this.level = level;

        this.container = new createjs.Container();
        this.container.x = 320;
        this.container.y = 455;
        this.parent.addChild(this.container);

        this.pic = new Picture(this.container, this.level.asset);
        this.pic.bitmap.regX = this.pic.bitmap.image.width / 2;
        this.pic.bitmap.regY = this.pic.bitmap.image.height / 2;

        this.addComponent(this.pic);

        this.sticker = new Sticker(this.container, this.level.stickerX, this.level.stickerY, this.level.stickerScale);
        this.addComponent(this.sticker);
    },

    addStickerStar: function() {
        this.stickerStar = new Picture(this.container, "stickerStar", {x:this.level.stickerX, y:this.level.stickerY});
        this.container.setChildIndex(this.stickerStar.bitmap, 1);
        this.stickerStar.bitmap.scaleX = this.stickerStar.bitmap.scaleY = this.level.stickerScale;
        this.stickerStar.bitmap.regX = 318 / 2;
        this.stickerStar.bitmap.regY = 318 / 2;
        this.addComponent(this.stickerStar);
    },

    destroy: function() {

        this._super();

        this.parent.removeChild(this.container);
    }

});