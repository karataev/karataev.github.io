/**
 * Created by postepenno on 12.05.2014.
 */

var Timer = ComponentBox.extend({

    init: function(game, parent)
    {
        this.game = game;
        this.parent = parent;

        this._super();

        this.container = new createjs.Container();
        this.parent.addChild(this.container);

        this.addComponent( new Picture(this.parent, "timerIcon", {x:45, y:50, center:true}) );

        var timeStr = Util.formatTime(0);
        this.timeTf = new TextField(this.parent, timeStr, {x:140, y:30, font:"37px Arial", align:"center"});
        this.addComponent(this.timeTf);
    },

    update: function()
    {
        var timeStr = Util.formatTime(this.game.levelTime);
        this.timeTf.setText(timeStr);
    }

});