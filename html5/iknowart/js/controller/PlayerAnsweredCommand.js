/**
 * Created by postepenno on 27.02.14.
 */

var PlayerAnsweredCommand = Class.extend({

    init: function(game) {
        this.game = game;

        this.disableAButtons();

        if (Config.ANIMATION)
        {
            this.game.painting.addStickerStar();
            var star = this.game.painting.stickerStar;
            var scale = star.bitmap.scaleX;
            star.bitmap.scaleX = star.bitmap.scaleY = 0;
            createjs.Tween.get(star.bitmap)
                .to({scaleX:scale, scaleY:scale}, 1000, createjs.Ease.backOut)
                .wait(500)
                .to({scaleX:0, scaleY:0}, 500, createjs.Ease.linear);

            createjs.Tween.get(star.bitmap)
                .to({rotation:90}, 2000, createjs.Ease.linear);

            createjs.Tween.get(this.game.painting.sticker.bitmap)
                .wait(1800)
                .to({alpha:0}, 500, createjs.Ease.linear)
                .call(this.animationComplete, [], this);

            this.game.ui.desc.fadeIn(1800, 500);
        } else {
            this.game.painting.sticker.bitmap.alpha = 0;
            this.animationComplete();
        }

    },

    animationComplete: function()
    {
        this.game.ui.nextBtn.show();
        this.game.ui.nextBtn.enableClick();
        this.game.ui.nextBtn.bmp.alpha = 0;
        createjs.Tween.get(this.game.ui.nextBtn.bmp)
            .to({alpha:1}, 500);


        var correctAnswer = this.game.curLevel.getAnswers()[0];
        var correctButton = this.game.getCorrectButton();
        if (this.game.playerAnswer === correctAnswer) {
            this.game.curLevel.playerCorrect = true;
            Sounds.play("sndRight");
            correctButton.doCorrect(true);
        } else {
            Sounds.play("sndWrong");
            correctButton.doCorrect(false);
        }


        //console.log("Description", this.game.curLevel.description);
    },

    disableAButtons: function() {
        for (var i = 0; i < this.game.abuttons.length; i++) {
            var abutton = this.game.abuttons[i];
            abutton.disable();
        }
    }



});