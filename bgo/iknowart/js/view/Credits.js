/**
 * Created by postepenno on 12.03.14.
 */

var Credits = ComponentBox.extend({

    init: function()
    {
        this._super();

        this.pic = new Picture(Main.viewContainer, "creditsBack", {x: 0, y:0});
        this.addComponent(this.pic);

        this.logoBt = new Button(Main.viewContainer, "postepennoLogo", 200, 292, this.logoClick, this);
        this.addComponent(this.logoBt);
        this.addHitArea(this.logoBt.bmp);

        this.karataevBt = new Button(Main.viewContainer, "karataev", 128, 610, this.karataevClick, this);
        this.addComponent(this.karataevBt);
        this.addHitArea(this.karataevBt.bmp);

        var close = new Button(Main.viewContainer, "closeButton", 538, 252, this.closeClick, this);
        close.bmp.regX = close.bmp.regY = 40;
        this.addComponent(close);

        this.pic.bitmap.addEventListener("click", this);
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
        Main.removeViewByClass(Credits);
    },

    handleEvent: function(event)
    {
        switch (event.type) {
            case "click":
                //console.log("CLICK");
                break;
        }

    },

    destroy: function()
    {
        this.pic.bitmap.removeEventListener("click", this);

        this._super();
    }

});