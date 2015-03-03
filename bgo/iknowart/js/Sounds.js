/**
 * Created by postepenno on 03.02.14.
 */

var Sounds = Class.extend({

});

Sounds.soundEnabled = true;
//Sounds.musicChannel = undefined;

Sounds.play = function(snd) {
    if (Sounds.soundEnabled) {
        var s = createjs.Sound.play(snd);
        //console.log("SOUND", s.src);
    }
};

Sounds.toggle = function() {
    Sounds.soundEnabled = !Sounds.soundEnabled;
};

Sounds.mute = function() {
    Sounds.soundEnabled = false;
};

Sounds.unmute = function() {
    Sounds.soundEnabled = true;
};

Sounds.startMusic = function() {

    Sounds.musicChannel = createjs.Sound.play("music", {loop:-1, volume:0.5});
};