/**
 * Created by postepenno on 05.09.2014.
 */

App.PicTileGallery = App.PicTile.extend({

    init: function(manager, id, parent, source, row, col, width, height)
    {
        this._super(manager, id, parent, source, row, col, width, height);


    },

    bornWithScale: function(delay)
    {
        this.bmdHolder.scale.x = this.bmdHolder.scale.y = 0;
        game.add.tween(this.bmdHolder.scale).to({x:1, y:1}, 500, Phaser.Easing.Back.Out, true, delay);
    },

    dieWithScale: function(delay)
    {
        game.add.tween(this.bmdHolder.scale).to({x:0, y:0}, 500, Phaser.Easing.Back.In, true, delay);
    },

    born: function(bornMode)
    {
        var delay = bornMode.getDelay(this);
        if (bornMode.useScale)
        {
            this.bmdHolder.scale.x = this.bmdHolder.scale.y = 0;
            game.add.tween(this.bmdHolder.scale).to({x:1, y:1}, 500, Phaser.Easing.Back.Out, true, delay);
        }
        if (bornMode.useRotation)
        {
            this.bmdHolder.angle = 90;
            var targetAngle = 0;
            game.add.tween(this.bmdHolder).to({angle:targetAngle}, 500, Phaser.Easing.Linear.None, true, delay);
        }
    },

    bornWithScaleRotation: function(delay)
    {
        this.bmdHolder.scale.x = this.bmdHolder.scale.y = 0;
        this.bmdHolder.angle = 90;
        //var targetAngle = -5 + Math.floor(Math.random() * 10);
        var targetAngle = 0;
        game.add.tween(this.bmdHolder.scale).to({x:1, y:1}, 500, Phaser.Easing.Back.Out, true, delay);
        game.add.tween(this.bmdHolder).to({angle:targetAngle}, 500, Phaser.Easing.Linear.None, true, delay);
    },

    dieWithScaleRotation: function(delay)
    {
        game.add.tween(this.bmdHolder.scale).to({x:0, y:0}, 500, Phaser.Easing.Back.In, true, delay);
        game.add.tween(this.bmdHolder).to({angle:90}, 500, Phaser.Easing.Linear.None, true, delay);
    }

});