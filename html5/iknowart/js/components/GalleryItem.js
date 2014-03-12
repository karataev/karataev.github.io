/**
 * Created by postepenno on 11.03.14.
 */

var GalleryItem = ComponentBox.extend({

    init: function(parent, level, x, y)
    {
        this._super();

        this.parent = parent;

        var pic = new Picture(this.parent, level.asset, {x:x, y:y});
        pic.bitmap.scaleX = pic.bitmap.scaleY = 0.15;
        this.addComponent(pic);

        var asset = level.playerCorrect ? "itemGalka" : "itemKrest";
        var icon = new Picture(this.parent, asset, {x:x, y:y});
        this.addComponent(icon);
    }

});