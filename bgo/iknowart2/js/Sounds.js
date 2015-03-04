/**
 * Created by postepenno on 23.06.2014.
 */

App.Sounds = Class.extend({

    init: function()
    {
        this.musicChannel = undefined;
    },

    startMusic: function()
    {
        if (Config.SOUNDS_ENABLED)
        {
            this.musicChannel = game.add.audio("music", 1, true);
            this.musicChannel.play();
        }
    },

    stopMusic: function()
    {
        if (this.musicChannel) this.musicChannel.pause();
    },

    play: function(asset, v)
    {
        var volume = 1;
        if (v != undefined) volume = v;
        if (Config.SOUNDS_ENABLED) game.sound.play(asset, volume);
    },

    mute: function()
    {
        Config.SOUNDS_ENABLED = false;
        this.stopMusic();
    },

    unmute: function()
    {
        Config.SOUNDS_ENABLED = true;
        this.startMusic();
    }

});

