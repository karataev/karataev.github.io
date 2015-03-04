/**
 * Created by postepenno on 16.08.2014.
 */

App.GridCell = Class.extend({

    init: function(grid, parent, id, row, col)
    {
        this.id = id;
        this.grid = grid;
        this.row = row;
        this.col = col;

        this.x = col * grid.cellWidth;
        this.y = row * grid.cellHeight;

        if (Config.DEBUG_GRID)
        {
            game.add.text(this.x + 5, this.y + 5, id.toString(), {font: "12px Arial", fill: "#000000"}, parent);
        }
    }



});