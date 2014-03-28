/**
 * Created by postepenno on 28.03.14.
 */

var LevelsGroup = ComponentBox.extend({

    init: function(id, game, parent)
    {
        this.id = id;
        this.game = game;
        this.parent = parent;

        this._super();

        this.holder = new createjs.Container();
        this.holder.y = this.id * Config.HEIGHT;
        this.parent.addChild(this.holder);

        var inRow = 3;
        var spaceX = 100;
        var spaceY = 100;
        var padX = (Config.WIDTH - spaceX * (inRow - 1)) / 2;
        var padY = 120;

        var start = this.id * 9;
        var end = (this.id + 1) * 9;
        //var levels = 9//this.game.levels.length;
        var j = 0;
        for (var i = start; i < end; i++)
        {
            var level = this.game.levels[i];
            var px = padX + j % inRow * spaceX;
            var py = padY + Math.floor(j / inRow) * spaceY;
            var item = new LevelItem(this.game, this.holder, level, px, py);
            this.addComponent(item);
            j++;
        }

    },

    destroy: function()
    {
        this._super();

        this.parent.removeChild(this.holder);
    }

});