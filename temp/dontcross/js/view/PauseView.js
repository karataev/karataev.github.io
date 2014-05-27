/**
 * Created by postepenno on 24.02.14.
 */

var PauseView = Dialog.extend({

    init: function(parent, game)
    {
        this._super(game, parent, {asset:"pauseBox", x:100, y:200, blockBack:true});

        this.addComponent( new Button(this.holder, "levelsButton", this.exitClick, this, {x:130, y:210, center:true}) );
        this.addComponent( new Button(this.holder, "nextButton", this.resumeClick, this, {x:310, y:210, center:true}) );
    },

    resumeClick: function(bt)
    {
        this.game.tickerResume();
        Main.removeViewByClass(PauseView);
    },

    exitClick: function(bt)
    {
        this.game.tickerResume();
        Fader.fade(this.goExit, this);
    },

    goExit: function()
    {
        this.game.gameAbort();
    }

});