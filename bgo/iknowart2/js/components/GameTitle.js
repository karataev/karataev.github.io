/**
 * Created by postepenno on 09.09.2014.
 */

App.GameTitle = Class.extend({

    init: function(x, y)
    {
        this.group = game.add.group();
        this.group.x = x;
        this.group.y = y;

        this.wordIY = 17;
        this.wordKnowY = 35;
        this.wordArtY = 36;
        this.word2Y = 38;

        this.wordI = data.addAtlasSprite("wordI", {x:0, y:this.wordIY, parent:this.group});
        this.wordKnow = data.addAtlasSprite("wordKnow", {x:130, y:this.wordKnowY, parent:this.group});
        this.wordArt = data.addAtlasSprite("wordArt", {x:340, y:this.wordArtY, parent:this.group});
        this.word2 = data.addAtlasSprite("word2", {x:470, y:this.word2Y, parent:this.group});

        this.time = 0;
    },

    update: function()
    {
        this.wordI.y = this.wordIY + 15 * Math.sin(this.time + 0.4 * 3);
        this.wordKnow.y = this.wordKnowY + 15 * Math.sin(this.time + 0.4 * 2);
        this.wordArt.y = this.wordArtY + 15 * Math.sin(this.time + 0.4 * 1);
        this.word2.y = this.word2Y + 15 * Math.sin(this.time + 0.4 * 0);
        this.time += 0.05;
    }

});