/**
 * Created by postepenno on 27.08.2014.
 */

App.RotationCircle = Class.extend({

    init: function(parent, sourceSprite, x, y, radius, startAngle)
    {
        this.parent = parent;
        this.radius = radius;
        this.sourceSprite = sourceSprite;

        this.width = radius * 2;
        this.height = radius * 2;

        var bmd = game.make.bitmapData(this.width, this.height);
        var rect = new Phaser.Rectangle(0, 0, this.width, this.height);
        //bmd.copyPixels(this.sourceSprite, rect, 0, 0);

        var maskData = game.make.bitmapData(this.width, this.height);
        maskData.circle(radius, radius, radius);
        var maskSource = new Phaser.Image(game, 0, 0, maskData);
        //this.parent.add(maskImage);

        //var maskSource = new Phaser.Sprite(game, 0, 0, data.atlasName, data.getAtlasKey("circleMask"));
        var sourceRect = new Phaser.Rectangle(-x + radius, -y + radius, this.sourceSprite.width, this.sourceSprite.height);
        var maskRect = rect;
        bmd.alphaMask(this.sourceSprite, maskSource, sourceRect, maskRect);

        this.bmdHolder = new Phaser.Image(game, 0, 0, bmd);
        this.bmdHolder.anchor.set(0.5, 0.5);
        this.bmdHolder.x = this.width / 2;
        this.bmdHolder.y = this.height / 2;
        this.parent.add(this.bmdHolder);

        this.bmdHolder.x = x;
        this.bmdHolder.y = y;

        this.offsetAngle = 0;
        this.bmdHolder.angle = startAngle;
    },

    rotateToPoint: function(px, py)
    {
        var dx = px - this.bmdHolder.x;
        var dy = py - this.bmdHolder.y;
        var angle = Math.atan2(dy, dx) * 180 / Math.PI;
        this.bmdHolder.angle = -this.offsetAngle + angle;
    },

    updateOffsetAngle: function(px, py)
    {
        var dx = px - this.bmdHolder.x;
        var dy = py - this.bmdHolder.y;
        var angle = Math.atan2(dy, dx) * 180 / Math.PI;
        this.offsetAngle = -this.bmdHolder.angle + angle;
    },

    isPointInside: function(px, py)
    {
        var dist = util.getDist(this.bmdHolder.x, this.bmdHolder.y, px, py);
        return dist <= this.radius;
    },

    getAngle: function()
    {
        return this.bmdHolder.angle;
    },

    getX: function()
    {
        return this.bmdHolder.x;
    },

    getY: function()
    {
        return this.bmdHolder.y;
    },

    victory: function()
    {
        game.add.tween(this.bmdHolder).to({angle:0}, 1000, Phaser.Easing.Quadratic.Out, true);

        var sign = data.addAtlasSprite("circleWinSign", {x:this.bmdHolder.x, y:this.bmdHolder.y, parent:this.parent});
        sign.anchor.set(0.5, 0.5);
        sign.width = this.width;
        sign.height = this.height;
        var scaleTo = sign.scale.x * 1.5;
        game.add.tween(sign.scale).to({x:scaleTo, y:scaleTo}, 1000, Phaser.Easing.Linear.None, true);
        game.add.tween(sign).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true);
    }

});