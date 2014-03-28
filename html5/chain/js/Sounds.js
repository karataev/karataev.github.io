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
    /*if (Sounds.soundEnabled) {
        Sounds.startMusic();
    }
    else {
        Sounds.musicChannel.stop();
    }*/
};

Sounds.startMusic = function() {

    Sounds.musicChannel = createjs.Sound.play("music", {loop:-1, volume:0.5});
};