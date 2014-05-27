/**
 * Created by postepenno on 09.02.14.
 */

var Button = Component.extend({

    init: function(parent, assetName, callback, scope, params)
    {
        this.parent = parent;
        this.assetName = assetName;
        this.callback = callback;
        this.scope = scope;

        this.x = 0;
        this.y = 0;
        this.center = false;
        this.scale = 1;

        if (params)
        {
            if (params.x != undefined) this.x = params.x;
            if (params.y != undefined) this.y = params.y;
            if (params.center != undefined) this.center = params.center;
            if (params.scale != undefined) this.scale = params.scale;
        }

        this.bmp = new createjs.Bitmap(assets.get(this.assetName));
        this.bmp.x = this.x;
        this.bmp.y = this.y;
        this.bmp.scaleX = this.bmp.scaleY = this.scale;
        this.parent.addChild(this.bmp);

        if (this.center)
        {
            var w = this.bmp.image.width;
            var h = this.bmp.image.height;
            this.bmp.regX = w / 2;
            this.bmp.regY = h / 2;
        }

        this.enableClick();

        this.bmp.cursor = "pointer";
    },

    hide: function() {
        this.bmp.visible = false;
    },

    show: function() {
        this.bmp.visible = true;
    },

    scaleHide: function()
    {
        this.bmp.scaleX = this.bmp.scaleY = 1;
        createjs.Tween.get(this.bmp)
            .to({scaleX:0, scaleY:0}, 200)
    },

    scaleShow: function()
    {
        this.bmp.visible = true;
        this.bmp.scaleX = this.bmp.scaleY = 0;
        createjs.Tween.get(this.bmp)
            .to({scaleX:1, scaleY:1}, 200)
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
                //this.callback(this, this.scope);
                this.callback.call(this.scope, this);
                break;
        }
    },

    destroy: function() {
        this.disableClick();
        this.parent.removeChild(this.bmp);
    }

});