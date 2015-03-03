/**
 * Created by postepenno on 10.03.14.
 */

var Fader = Class.extend({

});

Fader.init = function()
{
    Fader.pic = new Picture(Main.fpsContainer, "fader");
    Fader.pic.bitmap.addEventListener("click", Fader);
    Fader.pic.bitmap.visible = false;
};

Fader.handleEvent = function(event) {};

Fader.fade = function(callback, scope)
{
    Fader.pic.bitmap.visible = true;
    Fader.pic.bitmap.alpha = 0;
    createjs.Tween.get(Fader.pic.bitmap)
        .to({alpha:1}, 500)
        .call(callback, [], scope)
        .to({alpha:0}, 500)
        .call(Fader.fadeComplete);

};

Fader.fadeComplete = function() {
    //console.log("complete!");
    Fader.pic.bitmap.visible = false;
};
