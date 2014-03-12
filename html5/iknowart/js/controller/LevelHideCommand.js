/**
 * Created by postepenno on 27.02.14.
 */

var LevelHideCommand = Class.extend({

    init: function(game) {

        this.game = game;

        this.game.ui.nextBtn.disableClick();
        createjs.Tween.get(this.game.ui.nextBtn.bmp)
            .to({alpha:0}, 500);

        if (Config.ANIMATION)
        {

            for (var i = 0; i < this.game.abuttons.length; i++) {
                var abutton = this.game.abuttons[i];
                abutton.tweenHide(i * 300, 500);
            }

            createjs.Tween.get(this.game.painting.container)
                .to({alpha:0}, 1500, createjs.Ease.linear)
                .call(this.animationComplete, [], this);

            this.game.ui.desc.fadeOut(0, 500);
        } else {
            this.animationComplete();
        }

    },

    animationComplete: function() {

        this.game.levelAbort();

        var nextId = this.game.curLevel.id + 1;
        if (nextId < this.game.levels.length) {
            this.game.levelStart(nextId);
        }
        else {
            Fader.fade(this.gameComplete, this);
        }
    },

    gameComplete: function()
    {
        Main.removeViewByClass(Game);
        Main.addView( new GameComplete(this.game) );
    }

});