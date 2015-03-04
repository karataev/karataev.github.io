/**
 * Created by postepenno on 15.08.2014.
 */

App.Grid = Class.extend({

    init: function(parent, width, height, rows, cols)
    {
        this.rows = rows;
        this.cols = cols;
        this.width = width;
        this.height = height;

        this.group = game.add.group(parent);

        this.cellWidth = Math.round(this.width / this.cols);
        this.cellHeight = Math.round(this.height / this.rows);
        var i, j;

        this.cells = [];
        for (i = 0; i < rows; i++)
        {
            for (j = 0; j < cols; j++)
            {
                var cellId = i * cols + j;
                var cell = new App.GridCell(this, this.group, cellId, i, j);
                this.cells.push(cell);
            }
        }

        if (Config.DEBUG_GRID) this.drawCells();
    },

    drawCells: function()
    {
        this.g = new Phaser.Graphics(game, 0, 0);
        this.group.add(this.g);

        this.g.clear();
        this.g.lineStyle(2, 0x777777);
        for (i = 0; i <= this.cols; i++)
        {
            this.g.moveTo(i * this.cellWidth, 0);
            this.g.lineTo(i * this.cellWidth, this.height);
        }
        for (i = 0; i <= this.rows; i++)
        {
            this.g.moveTo(0, i * this.cellHeight);
            this.g.lineTo(this.width, i * this.cellHeight);
        }
    }

});