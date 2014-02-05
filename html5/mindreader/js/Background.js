/**
 * Created by postepenno on 17.01.14.
 */

function Background() {
    this.skin = new createjs.Bitmap(loader.getResult("background"));
    //this.skin.alpha = 0.5;
    stage.addChild(this.skin);
}

Background.prototype.destroy = function() {
    stage.removeChild(this.skin);
}