/**
 * Created by postepenno on 09.02.14.
 */

var Button = Component.extend({

    init: function(parent, assetName, x, y, callback, scope)
    {
        this.parent = parent;
        this.assetName = assetName;
        this.x = x;
        this.y = y;
        this.callback = callback;
        this.scope = scope;

        this.bmp = new createjs.Bitmap(assets.get(this.assetName));
        this.bmp.x = x;
        this.bmp.y = y;
        this.parent.addChild(this.bmp);

        this.enableClick();

        this.bmp.cursor = "pointer";
    },

    hide: function() {
        this.bmp.visible = false;
    },

    show: function() {
        this.bmp.visible = true;
    },

    enableClick: function() {
        this.bmp.addEventListener("click", this);
    },

    disableClick: function() {
        this.bmp.removeEventListener("click", this);
    },

    handleEvent: function(event) {
        switch (event.type) {
            case "click":
                Sounds.play("sndClick");
                this.callback(this, this.scope);
                break;
        }
    },

    destroy: function() {
        this.disableClick();
        this.parent.removeChild(this.bmp);
    }

});