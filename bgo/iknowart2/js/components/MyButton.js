/**
 * Created by postepenno on 19.06.2014.
 */

App.MyButton = Class.extend({

    init: function(key, callback, callbackContext, params)
    {
        this.callback = callback;
        this.callbackContext = callbackContext;

        var x = util.getParam(params, "x", 0);
        var y = util.getParam(params, "y", 0);
        var center = util.getParam(params, "center", false);
        var parentGroup = util.getParam(params, "parentGroup", game.world);
        var useAtlas = util.getParam(params, "atlas", true);
        this.wobble = util.getParam(params, "wobble", false);

        if (useAtlas)
        {
            var atlasKey = data.getAtlasKey(key);
            this.bt = game.add.button(x, y, data.atlasName, this.clickHandler, this, atlasKey, atlasKey, atlasKey, atlasKey, parentGroup);
        }
        else this.bt = game.add.button(x, y, key, this.clickHandler, this, null, null, null, null, parentGroup);

        this.bt.input.useHandCursor = true;
        if (center) this.bt.anchor.set(0.5, 0.5);
    },

    clickHandler: function()
    {
        sounds.play("sndClick");
        if (this.wobble) util.wobble(this.bt);
        this.callback.call(this.callbackContext);
    },

    scaleHide: function()
    {
        game.add.tween(this.bt.scale).to({x:0, y:0}, 200, Phaser.Easing.Linear.None, true);
    },

    scaleShow: function()
    {
        game.add.tween(this.bt.scale).to({x:1, y:1}, 200, Phaser.Easing.Linear.None, true);
    },

    hide: function()
    {
        this.bt.scale.x = this.bt.scale.y = 0;
    },

    show: function()
    {
        this.bt.scale.x = this.bt.scale.y = 1;
    },

    disableClick: function()
    {
        this.bt.inputEnabled = false;
    },

    enableClick: function()
    {
        this.bt.inputEnabled = true;
    },

    destroy: function()
    {
        this.bt.destroy();
    }

});

