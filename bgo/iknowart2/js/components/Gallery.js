/**
 * Created by postepenno on 05.09.2014.
 */

App.Gallery = Class.extend({

    init: function(parent)
    {
        this.group = game.add.group(parent);
        //this.sourceSprite.destroy();
        //this.parent.addChild(sprite);

        this.grid = new App.Grid(this.group, 640, 640, 5, 5);

        this.bornModes = [];
        this.addBornMode({useScale:true, useRotation:false, startFrom:"center"});
        this.addBornMode({useScale:true, useRotation:true, startFrom:"topLeft"});
        this.addBornMode({useScale:true, useRotation:false, startFrom:"topLeft"});

        this.startRound();
    },

    addBornMode: function(params)
    {
        this.bornModes.push( new App.BornMode(params) );
    },

    startRound: function()
    {
        var index0 = Math.floor( Math.random() * this.bornModes.length );
        this.bornMode = this.bornModes[index0];

        var index = Math.floor(Math.random() * data.paintings.length);
        this.sourceSprite = data.createPaintingSprite(data.paintings[index].name);
        this.createTiles();
        this.showTiles();

        game.time.events.add(this.bornMode.showTime, this.endRound, this);
    },

    createTiles: function()
    {
        this.tiles = [];
        for (var i = 0; i < this.grid.rows; i++)
        {
            for (var j = 0; j < this.grid.cols; j++)
            {
                var id = i * this.grid.cols + j;
                var piece = new App.PicTileGallery(this, id, this.group, this.sourceSprite, i, j, this.grid.cellWidth, this.grid.cellHeight);
                this.tiles.push(piece);
            }
        }
    },

    showTiles: function()
    {
        for (var i = 0; i < this.tiles.length; i++)
        {
            var tile = this.tiles[i];
            tile.born(this.bornMode);
        }
    },

    endRound: function()
    {
        this.hideTiles();

        game.time.events.add(Phaser.Timer.SECOND * 3, this.roundComplete, this);
    },

    hideTiles: function()
    {
        for (var i = 0; i < this.tiles.length; i++)
        {
            var tile = this.tiles[i];
            var delay = i * 100;
            //var delay = (Math.abs(2 - tile.row) + Math.abs(2 - tile.col)) * 300;
            tile.dieWithScale(delay);
        }
    },

    destroyTiles: function()
    {
        for (var i = 0; i < this.tiles.length; i++)
        {
            var tile = this.tiles[i];
            tile.destroy();
        }
    },

    roundComplete: function()
    {
        this.destroyTiles();

        this.startRound();
    }


});

App.BornMode = Class.extend({

    init: function(params)
    {
        this.useScale = true;
        this.useRotation = true;
        this.startFrom = "topLeft";

        if (params)
        {
            if (params.useScale != undefined) this.useScale = params.useScale;
            if (params.useRotation != undefined) this.useRotation = params.useRotation;
            if (params.startFrom != undefined) this.startFrom = params.startFrom;
        }

        this.showTime = 3000;
        if (this.startFrom == "topLeft") this.showTime = 25 * 100 + 500 + 2000;
        else if (this.startFrom == "center") this.showTime = 4000;
    },

    getDelay: function(tile)
    {
        if (this.startFrom == "topLeft") return (tile.row * 5 + tile.col) * 100;
        else if (this.startFrom == "center")return (Math.abs(2 - tile.row) + Math.abs(2 - tile.col)) * 300;
    }

});