/**
 * Created by postepenno on 02.07.2014.
 */

App.LevelItem = Class.extend({

    init: function(game, parentGroup, level, x, y)
    {
        this.game = game;
        this.level = level;
        this.parentGroup = parentGroup;

        this.group = new Phaser.Group(this.game, this.parentGroup);
        this.group.x = x;
        this.group.y = y;

        if (level.isOpen)
        {
            var textColor = 0x000000;
            var backAssetName;
            if (level.isCompleted) {
                backAssetName = "levelItemCompleteBack";
                textColor = 0x39541D;

            }
            else {
                backAssetName = "levelItemBack";
                textColor = 0xFFFFFF;
            }
            this.bt = new App.MyButton(backAssetName, this.click, this, {center:true, parentGroup:this.group});
            //var idTxt = new Phaser.Text(this.game, -6, -6, (this.level.id + 1).toString(), {font:"40px " + Config.FONT_LEVEL_SELECT_ID, fill:textColor});
            //idTxt.anchor.set(0.5, 0.5);
            //this.group.add(idTxt);
            var idTxt = this.game.add.bitmapText(0, 0, 'eras', (this.level.id + 1).toString(), 50, this.group);
            idTxt.x =  -idTxt.textWidth * 0.5;
            idTxt.y =  -idTxt.textHeight * 0.3;
            idTxt.tint = textColor;

            if (level.isCompleted)
            {
                var bestMoves = 0;
                if (level.bestMoves != undefined) bestMoves = level.bestMoves;

                var bestMovesTf = this.game.add.bitmapText(0, 0, 'eras', bestMoves.toString(), 18, this.group);
                bestMovesTf.x = -bestMovesTf.textWidth * 0.5;
                bestMovesTf.y = -bestMovesTf.textHeight * 0.5 + 30;
                bestMovesTf.tint = 0x222222;
            }
        }
        else
        {
            var pic = data.addAtlasSprite("levelItemLockedBack", {x:0, y:0, parent:this.group});
            pic.anchor.set(0.5, 0.5);
        }

    },

    click: function()
    {
        util.wobble(this.group);
        fader.fade(this.go, this);
    },

    go: function()
    {
        cmd.levelStart(this.level.id);
    }

});