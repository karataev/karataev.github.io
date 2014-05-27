/**
 * Created by postepenno on 24.03.14.
 */

var LevelFailView = Dialog.extend({

    init: function(game)
    {
        this._super(game, Main.viewContainer, {asset:"dialogSmall", x:50, y:330, blockBack:false});

        this.addComponent( new Picture(this.holder, "dialogSmall", {x:0, y:0}) );
        this.addComponent( new Picture(this.holder, "levelFailTitle", {x:110, y:25, center:true}) );
        this.addComponent( new Button(this.holder, "restartButton", this.restartClick, this, {x:110, y:90, center:true}) );
    },

    restartClick: function(bt)
    {
        var id = this.game.curLevel.id;
        this.game.levelAbort();
        this.game.levelStartByID(id);
    }

});