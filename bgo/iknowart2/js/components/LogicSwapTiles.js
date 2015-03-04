/**
 * Created by postepenno on 27.08.2014.
 */

App.LogicSwapTiles = App.GameLogic.extend({

    init: function(parent)
    {
        this._super(parent);

        this.createTiles();
        this.shuffleTilesPosition();

        this.selectedTile = null;
    },

    createTiles: function()
    {
        this.tiles = [];
        for (var i = 0; i < this.grid.rows; i++)
        {
            for (var j = 0; j < this.grid.cols; j++)
            {
                var id = i * this.grid.cols + j;
                var piece = new App.PicTileSwap(this, id, this.group, this.sourceSprite, i, j, this.grid.cellWidth, this.grid.cellHeight);
                this.tiles.push(piece);
            }
        }
    },

    shuffleTilesPosition: function()
    {
        var i, j;
        var randCells = [];
        for (i = 0; i < this.grid.rows; i++)
        {
            for (j = 0; j < this.grid.cols; j++)
            {
                randCells.push({row:i, col:j});
            }
        }

        //util.randomizeArray(randCells);
        do
        {
            var copyRandCells = util.randomizeAndCopyArray(randCells);

        } while (util.equalArrays(randCells, copyRandCells));


        for (i = 0; i < this.tiles.length; i++)
        {
            var randCell = copyRandCells[i];
            var tile = this.tiles[i];
            tile.setRowCol(randCell.row, randCell.col);
        }
    },

    touchDownHandler: function(pointer, event)
    {
        //this._super(parent, event);

        var mx = Math.round(pointer.x);
        var my = Math.round(pointer.y);

        var tile = this.getTileUnderPoint(mx - this.group.x ,my - this.group.y);
        if (tile && !this.isTweening)
        {
            if (this.selectedTile)
            {
                if (tile != this.selectedTile)
                {
                    this.swapTiles(this.selectedTile, tile);
                    cmd.playerMadeMove();
                    sounds.play("sndClick2")
                }
                //else console.log("Same tile. Do nothing");
                this.selectedTile.deselect();
                this.selectedTile = null;
            }
            else
            {
                this.selectedTile = tile;
                this.selectedTile.select();
                this.selectedTile.toTop();
                sounds.play("sndClick2")
            }
        }
    },

    swapTiles: function(tile1, tile2)
    {
        this.isTweening = true;

        tile1.toTop();
        tile2.toTop();

        var row1 = tile1.row;
        var col1 = tile1.col;

        tile1.tweenRowCol(tile2.row, tile2.col);
        tile2.tweenRowCol(row1, col1);
    },

    // fires twice!
    tileDoneTranslation: function()
    {
        if (this.isTweening == false) return;

        this.isTweening = false;
        this.maybeLevelComplete();
    },

    maybeLevelComplete: function()
    {
        var counter = 0;
        for (var i = 0; i < this.grid.rows; i++)
        {
            for (var j = 0; j < this.grid.cols; j++)
            {
                var tile = this.tiles[counter];
                if (!(tile.row == i && tile.col == j)) return;
                counter++;
            }
        }

        cmd.levelComplete();
        game.input.onDown.remove(this.touchDownHandler, this);

    },

    update: function()
    {
        if (this.selectedTile)
        {
            this.selectedTile.updateSelected();
        }
    }




});