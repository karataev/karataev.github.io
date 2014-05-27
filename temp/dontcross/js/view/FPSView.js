/**
 * Created by postepenno on 10.02.14.
 */

var FPSView = ComponentBox.extend({

    init:function()
    {
        this._super();

        this.fpsLabel = new TextField(Main.faderContainer, "FPS", {x:0, y:692, font:"bold 18px Arial"});
        this.addComponent(this.fpsLabel);

        this.tickRef = createjs.Ticker.on("tick", this.tick, this);
    },

    tick: function() {
        var fps = Math.round( createjs.Ticker.getMeasuredFPS() );
        this.fpsLabel.setText("FPS " + fps);
    },

    destroy: function()
    {
        this._super();

        createjs.Ticker.off("tick", this.tickRef);
    }

});