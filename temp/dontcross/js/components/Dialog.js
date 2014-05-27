/**
 * Created by postepenno on 10.04.2014.
 */

var Dialog = ComponentBox.extend({

    init: function(game, parent, params)
    {
        this.game = game;
        this.parent = parent;

        this._super();

        this.asset = "levelCompleteBack";
        this.x = 0;
        this.y = 0;
        this.blockBack = false;
        if (params)
        {
            if (params.asset) this.asset = params.asset;
            if (params.x != undefined) this.x = params.x;
            if (params.y != undefined) this.y = params.y;
            if (params.blockBack != undefined) this.blockBack = params.blockBack;
        }

        if (this.blockBack)
        {
            this.pic = new Picture(this.parent, "blackBack");
            this.addComponent(this.pic);
            this.pic.bitmap.addEventListener("click", this);
        }

        this.holder = new createjs.Container();
        this.holder.x = this.x;
        this.holder.y = this.y;
        this.parent.addChild(this.holder);

        this.addComponent( new Picture(this.holder, this.asset) );

        var holderY = this.holder.y;
        this.holder.y = Config.HEIGHT;
        createjs.Tween.get(this.holder, {ignoreGlobalPause:true})
            .to({y:holderY}, 1000, createjs.Ease.backOut);

        if (this.blockBack)
        {
            this.pic.bitmap.alpha = 0;
            createjs.Tween.get(this.pic.bitmap, {ignoreGlobalPause:true})
                .to({alpha:1}, 500);
        }

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

        if (this.blockBack) this.pic.bitmap.removeEventListener("click", this);
        this.parent.removeChild(this.holder);
    }

});