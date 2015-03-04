/**
 * Created by postepenno on 01.09.2014.
 */

App.PicTileSwap = App.PicTile.extend({

    init: function(manager, id, parent, source, row, col, width, height)
    {
        this._super(manager, id, parent, source, row, col, width, height);

        this.g = game.add.graphics(0, 0, this.group);

        //this.group.alpha = 0.5;
    },

    select: function()
    {
/*
        this.g.clear();
        this.g.lineStyle(5, "0xffffff");
        this.g.moveTo(0, 0);
        this.g.lineTo(this.width, this.height);
*/
        this.selection = data.addAtlasSprite("rectWinSign", {parent:this.group});
        this.selection.width = this.width;
        this.selection.height = this.height;
        this.selection.anchor.set(0.5, 0.5);
        this.selection.x = this.selection.width / 2;
        this.selection.y = this.selection.height / 2;

        this.rotateTime = 0;
    },

    deselect: function()
    {
        this.group.remove(this.selection);
        this.bmdHolder.angle = 0;
    },

    tweenRowCol: function(newRow, newCol)
    {
        //var dx = this.getX() - newX;
        //var dy = this.getY() - newY;
        //var dist = Math.sqrt(dx * dx + dy * dy);
        //var time = dist;

        this.row = newRow;
        this.col = newCol;

        var newX = this.col * this.width;
        var newY = this.row * this.height;

        var time = 400;
        var tween = game.add.tween(this.group).to({x:newX, y:newY}, time, Phaser.Easing.Cubic.InOut, true);
        tween.onComplete.addOnce(this.translateTweenComplete, this);
    },

    translateTweenComplete: function()
    {
        this.manager.tileDoneTranslation();
    },

    updateSelected: function()
    {
        this.bmdHolder.angle = Math.sin(this.rotateTime) * 3;
        this.selection.angle = Math.sin(this.rotateTime) * 3;
        this.rotateTime += 0.1;
    }



});