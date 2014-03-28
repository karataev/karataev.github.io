/**
 * Created by postepenno on 25.03.14.
 */

var LevelItem = ComponentBox.extend({

    init: function(game, parent, level, x, y)
    {
        this.game = game;
        this.parent = parent;
        this.level = level;

        this._super();

        this.holder = new createjs.Container();
        this.holder.x = x;
        this.holder.y = y;
        this.parent.addChild(this.holder);

        this.addComponent( new Button(this.holder, "levelItemBack", this.click, this, {center:true}) );
        var txt = this.level.id + 1;
        this.addComponent( new TextField(this.holder, txt, {align:"center", baseline:"middle", color:"#3A140B", font:"30px Ceviche One"}) );
    },

    click: function(bt, thisRef)
    {
        Main.removeViewByClass(LevelSelectView);
        thisRef.game.levelStart(thisRef.level.id);
    },

    destroy: function()
    {
        this._super();

        this.parent.removeChild(this.holder);
    }

});