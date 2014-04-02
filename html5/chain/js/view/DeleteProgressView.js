/**
 * Created by postepenno on 31.03.14.
 */

var DeleteProgressView = ComponentBox.extend({

    init: function(game)
    {
        this.game = game;

        this._super();

        this.parent = Main.viewContainer;

        this.pic = new Picture(this.parent, "blackBack");
        this.addComponent(this.pic);

        this.pic.bitmap.addEventListener("click", this);

        this.holder = new createjs.Container();
        this.holder.x = 50;
        this.holder.y = 240;
        this.parent.addChild(this.holder);

        this.addComponent( new Picture(this.holder, "deleteProgressInner") );

        this.addComponent( new Button(this.holder, "yesButton", this.yesClick, this, {x:60, y:135, center:true}) );
        this.addComponent( new Button(this.holder, "noButton", this.noClick, this, {x:160, y:135, center:true}) );

        var holderY = this.holder.y;
        this.holder.y = Config.HEIGHT;
        createjs.Tween.get(this.holder)
            .to({y:holderY}, 1000, createjs.Ease.backOut);

        this.pic.bitmap.alpha = 0;
        createjs.Tween.get(this.pic.bitmap)
            .to({alpha:1}, 500);

    },

    yesClick: function(bt, thisRef)
    {
        thisRef.game.progress.clear();
        Main.removeViewByClass(DeleteProgressView);
    },

    noClick: function(bt, thisRef)
    {
        Main.removeViewByClass(DeleteProgressView);
    },

    handleEvent: function(event) {
        switch (event.type) {
            case "click":
                break;
        }
    },

    destroy: function()
    {
        this._super();

        this.parent.removeChild(this.holder);
        this.pic.bitmap.removeEventListener("click", this);
    }


});