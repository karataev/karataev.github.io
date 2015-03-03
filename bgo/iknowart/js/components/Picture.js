/**
 * Created by postepenno on 09.02.14.
 */

var Picture = Component.extend({

    init: function(parent, assetName, params) {

        this.parent = parent;
        this.assetName = assetName;

        this.x = 0;
        this.y = 0;
        this.childIndex = this.parent.getNumChildren();

        if (params)
        {
            if (params.x != undefined) this.x = params.x;
            if (params.y != undefined) this.y = params.y;
            if (params.childIndex != undefined) this.childIndex = params.childIndex;
        }

        this.bitmap = new createjs.Bitmap(assets.get(assetName));
        this.bitmap.x = this.x;
        this.bitmap.y = this.y;
        this.parent.addChildAt(this.bitmap, this.childIndex);

    },

    setPos: function(x, y) {
        this.bitmap.x = x;
        this.bitmap.y = y;
    },

    destroy: function() {
        this.parent.removeChild(this.bitmap);
    }

});