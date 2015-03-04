/**
 * Created by postepenno on 22.08.2014.
 */

App.GameLogic = Class.extend({

    init: function(parent)
    {
        this.group = game.add.group(parent);
        this.group.x = 0;
        this.group.y = 0;

        this.sourceSprite = data.createPaintingSprite(data.curLevel.data.painting);
        //this.sourceSprite = new Phaser.Sprite(game, 0, 0, data.atlasName, data.getAtlasKey(data.curLevel.data.painting));
        var rows = data.curLevel.data.divide;
        var cols = data.curLevel.data.divide;
        this.grid = new App.Grid(this.group, this.sourceSprite.width, this.sourceSprite.height, rows, cols);

        this.isTweening = false;
        game.input.onDown.add(this.touchDownHandler, this);
    },

    // override
    touchDownHandler: function(pointer, event)
    {
        var mx = Math.round(pointer.x);
        var my = Math.round(pointer.y);

        console.log("game logic. override.");
    },

    getTileUnderPoint: function(px, py)
    {
        for (var i = 0; i < this.tiles.length; i++)
        {
            var tile = this.tiles[i];
            if (tile.isPointInside(px, py)) return tile;
        }
        return null;
    },

    getTileAt: function(row, col)
    {
        for (var i = 0; i < this.tiles.length; i++)
        {
            var tile = this.tiles[i];
            if (tile.row == row && tile.col == col) return tile;
        }
        return null;
    },

    update: function()
    {

    }

});