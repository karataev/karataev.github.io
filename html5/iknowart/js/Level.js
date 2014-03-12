/**
 * Created by postepenno on 12.02.14.
 */


var Level = Class.extend({

    init: function(id, asset, stickerX, stickerY, stickerScale, data) {

        this.id = id;
        this.asset = asset;
        //this.answers = answers;
        this.stickerX = stickerX;
        this.stickerY = stickerY;
        this.stickerScale = stickerScale;
        this.data = data;
        //this.description = description;

        this.playerCorrect = false;
    },

    getAnswers: function()
    {
        if (Config.LANG == "RU") return this.data.ru.answers;
        else return this.data.en.answers;
    },

    getTitle: function()
    {
        if (Config.LANG == "RU") return this.data.ru.title;
        else return this.data.en.title;
    }

});