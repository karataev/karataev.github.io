/**
 * Created by postepenno on 09.02.14.
 */

var SoundIcon = Component.extend({

    init: function(parent, x, y) {

        this.parent = parent;

        this.holder = new createjs.Container();
        this.parent.addChild(this.holder);
        this.holder.x = x;
        this.holder.y = y;

        this.bmpOn = new createjs.Bitmap(assets.get("soundIconOn"));
        this.holder.addChild(this.bmpOn);
        this.bmpOff = new createjs.Bitmap(assets.get("soundIconOff"));
        this.holder.addChild(this.bmpOff);

        this.updateIcon();
        this.holder.addEventListener("click", this);
    },

    updateIcon: function() {
        if (Sounds.soundEnabled) {
            this.bmpOn.visible = true;
            this.bmpOff.visible = false;
        }
        else {
            this.bmpOn.visible = false;
            this.bmpOff.visible = true;
        }
    },

    handleEvent: function(event) {
        switch (event.type) {
            case "click":
                Sounds.toggle();
                Sounds.play("sndClick");
                this.updateIcon();
                break;
        }
    },

    destroy: function() {
        this.holder.removeEventListener("click", this);
        this.parent.removeChild(this.holder);
    }

});