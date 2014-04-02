/**
 * Created by postepenno on 01.04.14.
 */

var Tutorial = ComponentBox.extend({

    init: function(game, parent)
    {
        this.game = game;
        this.parent = parent;

        this._super();

        if (this.game.curLevel.id == 0) this.addText("Tap smileys to clear the playfield!");
    },

    addText: function(txt)
    {
        this.addComponent( new TextField(this.parent, txt, {x:Config.WIDTH / 2, y: 240, align:"center", font:"25px Ceviche One", color:"#FFFFFF", shadow:true}) );
    }

});