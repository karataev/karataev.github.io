/**
 * Created by postepenno on 01.09.2014.
 */

App.LogicDragTiles = Class.extend({

    init: function(parent)
    {
        this.group = game.add.group(parent);

        this.sourceSprite = data.createPaintingSprite(data.curLevel.data.painting);
        this.group.add(this.sourceSprite);

        this.createTiles();

        this.activeTile = null;

        game.input.onDown.add(this.touchDownHandler, this);
    },

    createTiles: function()
    {
        //var id = 0;
        //var tile1 = new App.PicTileDrag(this, id, this.group, this.sourceSprite, {row:0, col:3}, {row:4, col:3});
        //id = 1;
        //var tile2 = new App.PicTileDrag(this, id, this.group, this.sourceSprite, {row:0, col:1}, {row:4, col:1});
        //this.tiles = [tile1, tile2];

        this.tiles = [];
        for (var i = 0; i < data.curLevel.data.tiles.length; i++)
        {
            var tileData = data.curLevel.data.tiles[i];
            this.addTile(tileData.from, tileData.to);
        }
    },

    addTile: function(from, to)
    {
        var id = this.tiles.length;
        var tile = new App.PicTileDrag(this, id, this.group, this.sourceSprite, from, to);
        this.tiles.push(tile);
    },

    touchDownHandler: function(pointer, event)
    {
        var mx = Math.round(pointer.x);
        var my = Math.round(pointer.y);

        var tile = this.getTileUnderPoint(mx - this.group.x ,my - this.group.y);
        if (tile)
        {
            this.activeTile = tile;
            this.activeTile.select(mx, my);
            this.activeTile.toTop();
            this.update();
            sounds.play("sndClick2");

            game.input.onUp.add(this.touchUpHandler, this);
        }
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

    touchUpHandler: function()
    {
        game.input.onUp.remove(this.touchUpHandler, this);
        cmd.playerMadeMove();
        this.maybeLevelComplete();

        this.activeTile = null;
    },

    maybeLevelComplete: function()
    {
        var maxOffset = 10;
        if (this.activeTile.getDistance() < maxOffset)
        {
            this.activeTile.victory();
            this.removeTile(this.activeTile);

            if (this.tiles.length == 0)
            {
                game.input.onDown.add(this.touchDownHandler, this);
                cmd.levelComplete();
            }
            else sounds.play("sndGood");
        }
    },

    removeTile: function(tile)
    {
        var index = this.tiles.indexOf(tile);
        this.tiles.splice(index, 1);
    },

    update: function()
    {
        if (this.activeTile)
        {
            this.activeTile.update();
        }
    }

});