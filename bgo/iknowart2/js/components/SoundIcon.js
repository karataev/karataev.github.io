/**
 * Created by postepenno on 19.06.2014.
 */

App.SoundIcon = Class.extend({

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

        this.btOn = new App.MyButton("soundIconOn", this.sndClick, this, {center:true, parentGroup:this.group});
        this.btOff = new App.MyButton("soundIconOff", this.sndClick, this, {center:true, parentGroup:this.group});

        this.updateIcon();
        //if (!game.device.desktop && !game.device.webAudio) this.hide();
    },

    updateIcon: function()
    {
        if (Config.SOUNDS_ENABLED)
        {
            this.btOn.show();
            this.btOff.hide();
        }
        else
        {
            this.btOn.hide();
            this.btOff.show();
        }
    },

    hide: function()
    {
        this.group.visible = false;
    },

    sndClick: function()
    {
        if (Config.SOUNDS_ENABLED) sounds.mute();
        else sounds.unmute();

        cookies.saveSound();
        this.updateIcon();

        util.wobble(this.group);
    },

    disableClick: function()
    {
        this.btOn.disableClick();
        this.btOff.disableClick();
    }

});

