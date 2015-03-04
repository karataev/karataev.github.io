/**
 * Created by postepenno on 08.09.2014.
 */

App.LanguageButton = Class.extend({

    init: function(params)
    {
        var x = util.getParam(params, "x", 0);
        var y = util.getParam(params, "y", 0);
        var scaleParam = util.getParam(params, "scale", 1);
        var parentGroup = util.getParam(params, "parentGroup", game.world);

        this.group = game.add.group(parentGroup);

        this.group.x = x;
        this.group.y = y;
        this.group.scale.x = this.group.scale.y = scaleParam;

        this.english = new App.MyButton("flagEn", this.click, this, {center:true, parentGroup:this.group});
        this.russian = new App.MyButton("flagRu", this.click, this, {center:true, parentGroup:this.group});

        this.updateIcon();
    },

    updateIcon: function()
    {
        this.english.hide();
        this.russian.hide();

        if (Config.LANGUAGE == "en") this.english.show();
        else if (Config.LANGUAGE == "ru") this.russian.show();
    },

    click: function()
    {
        util.wobble(this.group);

        if (Config.LANGUAGE == "en") Config.LANGUAGE = "ru";
        else if (Config.LANGUAGE == "ru") Config.LANGUAGE = "en";
        this.updateIcon();
    }

});