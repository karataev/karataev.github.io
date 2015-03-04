/**
 * Created by postepenno on 01.09.2014.
 */

App.PicTileDrag = App.PicTile.extend({

    init: function(manager, id, parent, source, from, to)
    {
        var width = 128;
        var height = 128;

        this._super(manager, id, parent, source, from.row, from.col, width, height);

        this.rail = undefined;
        if (from.row == to.row) this.rail = "horizontal";
        else if (from.col == to.col) this.rail = "vertical";

        this.startPos = {x:this.getX(), y:this.getY()};
        this.setXY(to.col * width, to.row * height);
    },

    select: function(px, py)
    {
        this.dragOffset = {x:px - this.getX(), y:py - this.getY()};
    },

    update: function()
    {
        var px = game.input.activePointer.worldX;
        var py = game.input.activePointer.worldY;

        if (this.rail == "horizontal") this.setX(px - this.dragOffset.x);
        else if (this.rail == "vertical") this.setY(py - this.dragOffset.y);
        this.fitInBounds();
    },

    fitInBounds: function()
    {
        var bounds = {x:0, y:0, width: 640, height:640};
        var x = this.getX();
        var y = this.getY();
        if (x < bounds.x) this.setX(bounds.x);
        else if (x + this.width > bounds.x + bounds.width) this.setX(bounds.x + bounds.width - this.width);

        if (y < bounds.y) this.setY(bounds.y);
        else if (y + this.height > bounds.y + bounds.height) this.setY(bounds.y + bounds.height - this.height);
    },

    getDistance: function()
    {
        var result = 0;
        if (this.rail == "horizontal") result = Math.abs(this.getX() - this.startPos.x);
        else if (this.rail == "vertical") result = Math.abs(this.getY() - this.startPos.y);

        return result;
    },

    victory: function()
    {
        this.parent.sendToBack(this.group);
        game.add.tween(this.group).to({x:this.startPos.x, y:this.startPos.y}, 300, Phaser.Easing.Quadratic.Out, true);

        var sign = data.addAtlasSprite("rectWinSign", {x:this.startPos.x + this.width / 2, y:this.startPos.y + this.height / 2, parent:this.parent});
        sign.anchor.set(0.5, 0.5);
        sign.width = this.width;
        sign.height = this.height;
        var scaleTo = sign.scale.x * 1.5;
        game.add.tween(sign.scale).to({x:scaleTo, y:scaleTo}, 1000, Phaser.Easing.Linear.None, true);
        game.add.tween(sign).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true);
    }

});