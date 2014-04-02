/**
 * Created by postepenno on 24.02.14.
 */

var PauseView = ComponentBox.extend({

    init: function(parent, game)
    {
        this._super();

        this.parent = parent;
        this.game = game;

        this.pic = new Picture(this.parent, "blackBack");
        this.addComponent(this.pic);

        this.addComponent( new Picture(this.parent, "pauseInner", {x:50, y:120}) );

        this.pic.bitmap.addEventListener("click", this);

        this.addComponent( new Button(this.parent, "playButton", this.resumeClick, this, {x:210, y:250, center:true}) );
        this.addComponent( new Button(this.parent, "exit2Button", this.exitClick, this, {x:110, y:250, center:true}) );

        //createjs.Ticker.setPaused(true);

        this.pic.bitmap.alpha = 0;
        createjs.Tween.get(this.pic.bitmap)
            .to({alpha:1}, 500);

    },

    resumeClick: function(bt, thisRef)
    {
        //createjs.Ticker.setPaused(false);
        Main.removeViewByClass(PauseView);
    },

    exitClick: function(bt, thisRef)
    {
        //createjs.Ticker.setPaused(false);
        Fader.fade(thisRef.goExit, thisRef);
    },

    goExit: function()
    {
        this.game.gameAbort();
    },

    handleEvent: function(event) {
        switch (event.type) {
            case "click":
                //console.log("FFFUUUU");
                break;
        }
    },

    destroy: function()
    {
        this._super();

        this.pic.bitmap.removeEventListener("click", this);
    }

});