/**
 * Created by postepenno on 28.03.14.
 */

var Cloud = ComponentBox.extend({

    init: function(parent, id)
    {
        this.parent = parent;
        this.id = id;

        this._super();

        this.speed = 1 * 0.5 / id;

        this.assetName = "";
        if (this.id == 1) this.assetName = "cloud1";
        else if (this.id == 2) this.assetName = "cloud2";
        else if (this.id == 3) this.assetName = "cloud3";
        else if (this.id == 4) this.assetName = "cloud4";

        this.pic = new Picture(this.parent, this.assetName);
        this.addComponent(this.pic);

        this.width = this.pic.bitmap.image.width;
        this.height = this.pic.bitmap.image.height;

        var px = Math.floor(Math.random() * Config.WIDTH);
        var py = Math.floor(Math.random() * (350 - this.height));
        this.pic.setPos(px, py);
    },

    update: function()
    {
        this.pic.bitmap.x += this.speed;
        if (this.pic.bitmap.x > Config.WIDTH) this.resetPos();
    },

    resetPos: function()
    {
        this.pic.bitmap.x = -this.width;
        this.pic.bitmap.y = Math.floor(Math.random() * (350 - this.height));
    }


});