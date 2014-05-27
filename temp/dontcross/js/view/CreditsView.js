/**
 * Created by postepenno on 01.04.14.
 */

var CreditsView = Dialog.extend({

    init: function(game)
    {
        this._super(game, Main.viewContainer, {asset:"creditsBox", x:60, y:60, blockBack:true});

        this.addComponent( new Button(this.holder, "closeButton", this.closeClick, this, {x:507, y:40, center:true}) );

        this.logoBt = new Button(this.holder, "postepennoLogo", this.logoClick, this, {x:120, y:104});
        this.addComponent(this.logoBt);
        this.addHitArea(this.logoBt.bmp);

        this.addComponent( new TextField(this.holder, texts.GAME_BY, {x:260, y:470, align:"center", font:"bold 40px PT Sans Narrow"}) );
        this.addComponent( new TextField(this.holder, "eugene.karataev@gmail.com", {x:260, y:520, align:"center", font:"bold 36px PT Sans Narrow"}) );
        this.addComponent( new ButtonRect(this.holder, this.karataevClick, this, {x:60, y:470, width:390, height:100, alpha:0.01}) );

        //this.addComponent( new TextField(this.holder, texts.MUSIC_BY, {x:132, y:340, align:"center", font:"bold 22px PT Sans Narrow"}) );

    },

    addHitArea: function(bmp) {
        var hit = new createjs.Shape();
        hit.graphics.beginFill("#000").drawRect(0,0,bmp.image.width, bmp.image.height);
        bmp.hitArea = hit;
    },

    karataevClick: function(bt) {
        window.location.href = "mailto:eugene.karataev@gmail.com";
    },

    logoClick: function(bt) {
        window.open("http://postepenno.com", "_blank");
    },

    closeClick: function(bt)
    {
        Main.removeViewByClass(CreditsView);
    }

});