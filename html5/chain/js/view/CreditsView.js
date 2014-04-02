/**
 * Created by postepenno on 01.04.14.
 */

var CreditsView = ComponentBox.extend({

    init: function(game)
    {
        this.game = game;

        this._super();

        this.parent = Main.viewContainer;

        this.pic = new Picture(this.parent, "blackBack");
        this.addComponent(this.pic);

        this.pic.bitmap.addEventListener("click", this);

        this.holder = new createjs.Container();
        this.holder.x = 28;
        this.holder.y = 45;
        this.parent.addChild(this.holder);

        this.addComponent( new Picture(this.holder, "creditsInner") );

        this.addComponent( new Button(this.holder, "closeButton", this.closeClick, this, {x:245, y:18, center:true}) );

        this.logoBt = new Button(this.holder, "postepennoLogo", this.logoClick, this, {x:48, y:80});
        this.addComponent(this.logoBt);
        this.addHitArea(this.logoBt.bmp);

        this.karataevBt = new Button(this.holder, "karataev", this.karataevClick, this, {x:18, y:305});
        this.addComponent(this.karataevBt);
        this.addHitArea(this.karataevBt.bmp);

        var holderY = this.holder.y;
        this.holder.y = Config.HEIGHT;
        createjs.Tween.get(this.holder)
            .to({y:holderY}, 1000, createjs.Ease.backOut);

        this.pic.bitmap.alpha = 0;
        createjs.Tween.get(this.pic.bitmap)
            .to({alpha:1}, 500);
    },

    addHitArea: function(bmp) {
        var hit = new createjs.Shape();
        hit.graphics.beginFill("#000").drawRect(0,0,bmp.image.width, bmp.image.height);
        bmp.hitArea = hit;
    },

    karataevClick: function(bt, thisRef) {
        window.location.href = "mailto:eugene.karataev@gmail.com";
    },

    logoClick: function(bt, thisRef) {
        window.open("http://postepenno.com", "_blank");
    },

    closeClick: function(bt, thisRef)
    {
        Main.removeViewByClass(CreditsView);
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