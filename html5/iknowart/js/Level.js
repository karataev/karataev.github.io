/**
 * Created by postepenno on 12.02.14.
 */


var Level = Class.extend({

    init: function(id, asset, answers, stickerX, stickerY, stickerScale, description) {

        this.id = id;
        this.asset = asset;
        this.answers = answers;
        this.stickerX = stickerX;
        this.stickerY = stickerY;
        this.stickerScale = stickerScale;
        this.description = description;

        this.playerCorrect = false;
    }

});