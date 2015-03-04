/**
 * Created by postepenno on 01.07.2014.
 */

App.Dialog = Class.extend({

    init: function(asset, params)
    {
        var x = util.getParam(params, "x", 0);
        var y = util.getParam(params, "y", 0);
        var blockBack = util.getParam(params, "blockBack", false);
        var doTween = util.getParam(params, "doTween", true);

        this.holder = new Phaser.Group(game, game.world);

        if (blockBack)
        {
            this.block = new Phaser.Sprite(game, 0, 0, "blackBack");
            this.block.inputEnabled = true;
            this.holder.add(this.block);
        }

        this.boxHolder = new Phaser.Group(game, this.holder);
        this.boxHolder.x = x;
        this.boxHolder.y = y;

        this.box = data.addAtlasSprite(asset, {parent:this.boxHolder});

        if (doTween)
        {
            var boxHolderY = this.boxHolder.y;
            this.boxHolder.y = Config.HEIGHT;
            game.add.tween(this.boxHolder).to({y:boxHolderY}, 1000, Phaser.Easing.Back.Out, true);

            if (blockBack)
            {
                this.block.alpha = 0;
                game.add.tween(this.block).to({alpha:1}, 500, Phaser.Easing.Linear.None, true);
            }
        }
    },

    destroy: function()
    {
        this.holder.destroy();
    }

});
