/**
 * Created by postepenno on 10.03.14.
 */

App.Fader = Class.extend({

    init: function(game)
    {
        this.game = game;
    },

    fade: function(callback, scope)
    {
        this.callback = callback;
        this.scope = scope;

        if (Config.ANIMATION)
        {
            this.pic = game.add.sprite(0, 0, "fader");
            this.pic.alpha = 0;
            this.pic.inputEnabled = true;
            var tween = game.add.tween(this.pic).to({alpha:0.8}, 300, Phaser.Easing.Linear.None, true);
            tween.onComplete.addOnce(this.fadeInComplete, this);
        }
        else this.callback.call(this.scope);
    },

    fadeInComplete: function()
    {
        App.Fader.SHOULD_FADE_OUT = true;
        this.callback.call(this.scope);
    },

    fadeOut: function()
    {
        App.Fader.SHOULD_FADE_OUT = false;
        this.pic = game.add.sprite(0, 0, "fader");
        this.pic.inputEnabled = true;
        var tween = game.add.tween(this.pic).to({alpha:0}, 300, Phaser.Easing.Linear.None, true);
        tween.onComplete.addOnce(this.fadeOutComplete, this);
    },

    fadeOutComplete: function()
    {
        this.pic.destroy();
    }

});


App.Fader.SHOULD_FADE_OUT = false;