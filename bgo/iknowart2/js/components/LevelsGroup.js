/**
 * Created by postepenno on 02.07.2014.
 */

App.LevelsGroup = Class.extend({

    init: function(game, id, parentGroup)
    {
        this.game = game;
        this.id = id;
        this.parentGroup = parentGroup;

        this.group = new Phaser.Group(this.game, this.parentGroup);
        this.group.y = this.id * Config.HEIGHT;

        var itemWidth = 80;
        var itemHeight = 85;

        this.rows = 4;
        this.cols = 4;
        this.boundsRect = {x:70 + 25, y:80 + 25, width:450, height:440};

        //this.drawBounds();

        var levelsInGroup = this.rows * this.cols;
        var spaceX = (this.boundsRect.width - itemWidth) / (this.cols - 1) ;
        var spaceY = (this.boundsRect.height - itemHeight) / (this.rows - 1);

        var start = this.id * levelsInGroup;
        var end = (this.id + 1) * levelsInGroup;
        var j = 0;
        for (var i = start; i < end; i++)
        {
            var level = data.levels[i];
            if (level)
            {
                var px = this.boundsRect.x + itemWidth / 2 + j % this.cols * spaceX;
                var py = this.boundsRect.y + itemHeight / 2 + Math.floor(j / this.cols) * spaceY;
                var item = new App.LevelItem(this.game, this.group, level, px, py);
            }
            j++;
        }

    },

    drawBounds: function()
    {
        this.g = game.add.graphics(0, 0, this.group);
        this.g.clear();
        this.g.lineStyle(5, this.color);
        this.g.drawRect(this.boundsRect.x, this.boundsRect.y, this.boundsRect.width, this.boundsRect.height);
    }

});