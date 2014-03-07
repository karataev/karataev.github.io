/**
 * Created by postepenno on 28.02.14.
 */

var Description = ComponentBox.extend({

    init: function(game, parent) {

        this._super();

        this.game = game;
        this.parent = parent;

        this.container = new createjs.Container();
        this.container.x = 0;
        this.container.y = 100;
        this.parent.addChild(this.container);
        this.createBack();

        this.tf = new TextField(this.container, "", {x:10, y:10, font:"22px Hermes"});
        this.addComponent(this.tf);

    },

    createBack: function() {
        var g = new createjs.Graphics();
        g.beginFill("#EEEEEE").drawRect(0, 0, Config.WIDTH, 50);
        this.back = new createjs.Shape(g);
        this.back.alpha = 0.7;
        this.container.addChild(this.back);
    },

    setText: function(text) {
        this.tf.setText(text);
    },

    hide: function() {
        this.container.alpha = 0;
    },

    show: function() {
        this.container.alpha = 1;
    },

    fadeIn: function(delay, time) {
        this.container.alpha = 0;
        createjs.Tween.get(this.container)
            .wait(delay)
            .to({alpha:1}, time)
    },

    fadeOut: function(delay, time) {
        createjs.Tween.get(this.container)
            .wait(delay)
            .to({alpha:0}, time)
    },

    destroy: function() {
        this._super();
        this.parent.removeChild(this.container);
    }


});