/**
 * Created by postepenno on 17.01.14.
 */

function Button(x, y, asset, callback, parent) {
    this.x = x;
    this.y = y;
    this.asset = asset;
    this.callback = callback;
    this.parent = parent;
    this.clickFunc;

    this.skin;

    this.init();
}

Button.prototype.init = function() {
    this.skin = new createjs.Bitmap(loader.getResult(this.asset));
    this.skin.x = this.x;
    this.skin.y = this.y;
    stage.addChild(this.skin);

    this.clickFunc = this.callback.bind(this.parent);
    this.skin.addEventListener("click", this.clickFunc);
}

Button.prototype.hide = function() {
    this.skin.visible = false;
}

Button.prototype.destroy = function() {
    this.skin.removeEventListener("click", this.clickFunc);
    stage.removeChild(this.skin);
}