/**
 * Created by postepenno on 17.01.14.
 */

function Card(x, y, asset) {
    this.x = x;
    this.y = y;
    this.asset = asset;

    this.skin;

    this.init();
}

Card.prototype.init = function() {
    this.skin = new createjs.Bitmap(loader.getResult(this.asset));
    stage.addChild(this.skin);

    this.skin.x = this.x;
    this.skin.y = this.y;
}

Card.prototype.destroy = function() {
    stage.removeChild(this.skin);
}