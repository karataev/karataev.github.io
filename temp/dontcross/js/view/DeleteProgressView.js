/**
 * Created by postepenno on 31.03.14.
 */

var DeleteProgressView = Dialog.extend({

    init: function(game)
    {
        this._super(game, Main.viewContainer, {asset:"clearProgressBox", x:100, y:150, blockBack:true});

        this.addComponent( new Button(this.holder, "yesButton", this.yesClick, this, {x:120, y:210, center:true}) );
        this.addComponent( new Button(this.holder, "noButton", this.noClick, this, {x:320, y:210, center:true}) );
    },

    yesClick: function(bt)
    {
        cookies.clear();
        Main.removeViewByClass(DeleteProgressView);
    },

    noClick: function(bt)
    {
        Main.removeViewByClass(DeleteProgressView);
    }


});