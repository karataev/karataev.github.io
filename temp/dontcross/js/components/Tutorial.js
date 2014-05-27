/**
 * Created by postepenno on 01.04.14.
 */

var Tutorial = ComponentBox.extend({

    init: function(game, parent)
    {
        this.game = game;
        this.parent = parent;

        this._super();

        if (this.game.curLevel.id == 0)
        {
            this.addText(texts.TUTORIAL1, 110, 500);
            this.addText(texts.TUTORIAL2, 600, 2000);
        }
    },

    addText: function(txt, posY, delay)
    {
        var tf = new TextField(this.parent, txt, {x:Config.WIDTH / 2, y: posY, align:"center", font:"34px Arial", color:"#000000"});
        this.addComponent(tf);

        tf.tf.alpha = 0.0;
        tf.tf.y -= 10;
        createjs.Tween.get(tf.tf)
            .wait(delay)
            .to({alpha:1, y:tf.tf.y + 10}, 1000, createjs.Ease.quadOut)
    }

});