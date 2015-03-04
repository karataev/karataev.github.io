/**
 * Created by postepenno on 27.08.2014.
 */

App.LogicRotateTiles = App.GameLogic.extend({

    init: function(parent)
    {
        this._super(parent);

        this.matrix = data.curLevel.data.matrix;
        if (this.matrix == undefined) this.matrix = [];

        this.createTiles();
        this.shuffleTilesRotation();
    },

    createTiles: function()
    {
        this.tiles = [];
        for (var i = 0; i < this.grid.rows; i++)
        {
            for (var j = 0; j < this.grid.cols; j++)
            {
                var id = i * this.grid.cols + j;
                var piece = new App.PicTileRotate(this, id, this.group, this.sourceSprite, i, j, this.grid.cellWidth, this.grid.cellHeight);
                this.tiles.push(piece);
            }
        }
    },

    shuffleTilesRotation: function()
    {
        for (var i = 0; i < this.tiles.length; i++)
        {
            var tile = this.tiles[i];
            var rand = this.getRand();
            tile.setRotationState(rand);
        }
    },

    getRand: function()
    {
        if (this.randoms == undefined || this.randoms.length == 0)
        {
            this.randoms = [0, 1, 2, 3];
            util.randomizeArray(this.randoms);
        }
        return this.randoms.pop();
    },

    touchDownHandler: function(pointer, event)
    {
        var mx = Math.round(pointer.x);
        var my = Math.round(pointer.y);

        var tile = this.getTileUnderPoint(mx - this.group.x ,my - this.group.y);
        if (tile && !this.isTweening)
        {
            this.isTweening = true;
            tile.rotateNext();
            this.rotateMatrixTiles(tile.row, tile.col);
            cmd.playerMadeMove();
            sounds.play("sndClick2");
        }
    },

    rotateMatrixTiles: function(baseRow, baseCol)
    {
        for (var i = 0; i < this.matrix.length; i++)
        {
            var m = this.matrix[i];
            var drow = m[0];
            var dcol = m[1];
            var nextTile = this.getTileAt(baseRow + drow, baseCol + dcol);
            if (nextTile) nextTile.rotateNext();
        }
    },

    // may fire multiply times!
    tileDoneRotation: function()
    {
        if (this.isTweening == false) return;

        this.isTweening = false;
        this.maybeLevelComplete();
    },

    maybeLevelComplete: function()
    {
        for (var i = 0; i < this.tiles.length; i++)
        {
            var tile = this.tiles[i];
            if (tile.rotationState != 0) return;
        }

        game.input.onDown.remove(this.touchDownHandler, this);
        cmd.levelComplete();
    }


});