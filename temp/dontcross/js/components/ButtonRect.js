/**
 * Created by postepenno on 09.02.14.
 */

var ButtonRect = Component.extend({

    init: function(parent, callback, scope, params)
    {
        this.parent = parent;
        this.callback = callback;
        this.scope = scope;

        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.color = "#FFFFFF";
        this.alpha = 1;

        if (params)
        {
            if (params.x != undefined) this.x = params.x;
            if (params.y != undefined) this.y = params.y;
            if (params.width != undefined) this.width = params.width;
            if (params.height != undefined) this.height = params.height;
            if (params.alpha != undefined) this.alpha = params.alpha;
        }

        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill(this.color).drawRect(0,0,this.width, this.height);
        this.shape.x = this.x;
        this.shape.y = this.y;
        this.shape.alpha = this.alpha;
        this.parent.addChild(this.shape);

        this.enableClick();

        this.shape.cursor = "pointer";
    },

    hide: function() {
        this.shape.visible = false;
    },

    show: function() {
        this.shape.visible = true;
    },

    enableClick: function() {
        this.shape.addEventListener("click", this);
    },

    disableClick: function() {
        this.shape.removeEventListener("click", this);
    },

    handleEvent: function(event) {
        switch (event.type) {
            case "click":
                Sounds.play("sndClick");
                this.callback.call(this.scope, this);
                break;
        }
    },

    destroy: function() {
        this.disableClick();
        this.parent.removeChild(this.shape);
    }

});