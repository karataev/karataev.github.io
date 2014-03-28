/**
 * Created by postepenno on 09.02.14.
 */

var Background = ComponentBox.extend({

    init: function() {

        this._super();

        this.container = new createjs.Container();
        Main.backContainer.addChild(this.container);

        this.addComponent( new Picture(this.container, "background") );

        this.cloud1 = new Cloud(this.container, 1);
        this.addComponent(this.cloud1);
        this.cloud2 = new Cloud(this.container, 2);
        this.addComponent(this.cloud2);
        this.cloud3 = new Cloud(this.container, 3);
        this.addComponent(this.cloud3);
        this.cloud4 = new Cloud(this.container, 4);
        this.addComponent(this.cloud4);

        this.tickListener = createjs.Ticker.on("tick", this.tick, this);

    },

    tick: function()
    {
        this.cloud1.update();
        this.cloud2.update();
        this.cloud3.update();
        this.cloud4.update();
    },

    destroy: function() {

        this._super();

        createjs.Ticker.off("tick", this.tickListener);
        Main.backContainer.removeChild(this.container);
    }

});