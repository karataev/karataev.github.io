/**
 * Created by postepenno on 09.02.14.
 */

var Background = Component.extend({

    init: function() {

        this.bitmap = new createjs.Bitmap(assets.get("background"));
        Main.viewContainer.addChild(this.bitmap);

    },

    destroy: function() {
        Main.viewContainer.removeChild(this.bitmap);
    }

});