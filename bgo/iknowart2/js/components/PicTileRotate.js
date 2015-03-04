/**
 * Created by postepenno on 01.09.2014.
 */

App.PicTileRotate = App.PicTile.extend({

    init: function(manager, id, parent, source, row, col, width, height)
    {
        this._super(manager, id, parent, source, row, col, width, height);

        this.rotationState = 0;
    },

    rotateNext: function()
    {
        this.rotationState++;
        if (this.rotationState == 4) this.rotationState = 0;
        this.rotate(true);
    },

    setRotationState: function(newState)
    {
        this.rotationState = newState;
        this.rotate(false);
    },

    rotate: function(useTween)
    {
        var newAngle = 0;
        if (this.rotationState == 1) newAngle = 90;
        else if (this.rotationState == 2) newAngle = 180;
        else if (this.rotationState == 3) newAngle = -90;

        if (useTween)
        {
            var tween = game.add.tween(this.bmdHolder).to({angle:newAngle}, 200, Phaser.Easing.Linear.None, true);
            tween.onComplete.addOnce(this.rotateTweenComplete, this);
        }
        else this.bmdHolder.angle = newAngle;
    },

    rotateTweenComplete: function()
    {
        this.manager.tileDoneRotation();
    }


});