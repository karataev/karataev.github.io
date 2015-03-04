/**
 * Created by postepenno on 15.08.2014.
 */

App.PicTile = Class.extend({

    init: function(manager, id, parent, source, row, col, width, height)
    {
        this.manager = manager;
        this.id = id;
        this.parent = parent;
        this.row = row;
        this.col = col;
        this.width = width;
        this.height = height;

        var x = col * width;
        var y = row * height;

        this.group = game.add.group(parent);

        var bmd = game.make.bitmapData(this.width, this.height);

        var offsetX = x;
        var offsetY = y;
        var rect = new Phaser.Rectangle(offsetX, offsetY, this.width, this.height);
        bmd.copyPixels(source, rect, 0, 0);

        this.bmdHolder = new Phaser.Image(game, 0, 0, bmd);
        this.bmdHolder.anchor.set(0.5, 0.5);
        this.bmdHolder.x = this.width / 2;
        this.bmdHolder.y = this.height / 2;
        this.group.add(this.bmdHolder);

        this.setXY(x, y);
        //this.group.alpha = 0.5;
    },

    isPointInside: function(px, py)
    {
        var inX = (px >= this.group.x && px <= this.group.x + this.width);
        var inY = (py >= this.group.y && py <= this.group.y + this.height);

        return inX && inY;
    },

    getX: function()
    {
        return this.group.x;
    },

    getY: function()
    {
        return this.group.y;
    },

    setXY: function(newX, newY)
    {
        this.group.x = newX;
        this.group.y = newY;
    },

    setX: function(newX)
    {
        this.group.x = newX;
    },

    setY: function(newY)
    {
        this.group.y = newY;
    },

    setRowCol: function(row, col)
    {
        this.row = row;
        this.col = col;
        this.setXY(col * this.width, row * this.height);
    },

    toTop: function()
    {
        this.parent.bringToTop(this.group);
    },

    destroy: function()
    {
        this.group.destroy();
    }

});