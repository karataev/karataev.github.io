/**
 * Created by postepenno on 27.02.14.
 */

var LevelShowCommand = Class.extend({

    init: function(game) {

        this.game = game;

        //this.game.ui.nextBtn.hide();

        for (var i = 0; i < this.game.abuttons.length; i++) {
            var abutton = this.game.abuttons[i];
            abutton.tweenShow(i * 300, 500);
        }

        var pic = this.game.painting.pic.bitmap;
        pic.alpha = 0;
        createjs.Tween.get(pic)
            .to({alpha:1}, 1500, createjs.Ease.linear)
            .call(this.complete, [], this);

    },

    complete: function() {
        //console.log("Show complete!");
    }

});