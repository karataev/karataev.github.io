/**
 * Created by postepenno on 31.03.14.
 */

var GameCompleteView = Dialog.extend({

    init: function(game)
    {
        this._super(game, Main.viewContainer, {asset:"gameCompleteBox", x:60, y:60, blockBack:false});

        this.addComponent( new Button(this.holder, "homeButton", this.exitClick, this, {x:260, y:500, center:true}) );
    },

    exitClick: function(bt)
    {
        Fader.fade(this.goExit, this)
    },

    goExit: function()
    {
        this.game.gameAbort();
    },

    destroy: function()
    {
        this._super();
    }


});