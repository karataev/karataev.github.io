/**
 * Created by postepenno on 01.07.2014.
 */

App.CreditsView = App.Dialog.extend({

    init: function()
    {
        this._super("creditsBox", {x:70, y:120, blockBack:true});

        this.closeBt = new App.MyButton("closeButton", this.closeClick, this, {x:470, y:30, center:true, parentGroup:this.boxHolder});
        this.logoBt = new App.MyButton("postepennoLogo", this.logoClick, this, {x:125, y:160, parentGroup:this.boxHolder});

        var titleStr = data.text("credits");
        var titleTxt = game.add.text(250, 60, titleStr, {font: "60px Arial", fill: "#000000", align:"center"}, this.boxHolder);
        titleTxt.anchor.set(0.5, 0.5);
    },

    closeClick: function()
    {
        this.destroy();
    },

    logoClick: function()
    {
        window.open("http://postepenno.com", "_blank");
    }

});

