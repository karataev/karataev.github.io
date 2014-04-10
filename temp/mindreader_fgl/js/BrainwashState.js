/**
 * Created by postepenno on 17.01.14.
 */

function BrainwashState() {

    this.back;
    this.nextButton;
    this.title1;
    this.title2;
    this.spiral;

    this.init();
}

BrainwashState.prototype.init = function() {
    this.back = new Background();
    this.nextButton = new Button(77, 375, "repeatButton", this.nextClick, this);
    this.title1 = new Sprite(41, 80, "brainwashTitle1");
    this.title2 = new Sprite(46, 175, "brainwashTitle2");
    this.spiral = new Sprite(160, 200, "spiral");
    this.spiral.skin.regX = this.spiral.skin.image.width / 2;
    this.spiral.skin.regY = this.spiral.skin.image.height / 2;

    this.title1.skin.alpha = 0;
    this.title2.skin.alpha = 0;
    this.nextButton.skin.alpha = 0;

    createjs.Tween.get(this.title1.skin)
        .to({alpha:1}, 1000, createjs.Ease.linear);

    createjs.Tween.get(this.title2.skin)
        .wait(2000)
        .to({alpha:1}, 1000, createjs.Ease.linear);

    createjs.Tween.get(this.nextButton.skin)
        .wait(4000)
        .to({alpha:1}, 1000, createjs.Ease.linear);
}

BrainwashState.prototype.nextClick = function(event) {
    //console.log("NEXT");
    this.destroy();
    currentState = new SurpriseState();
}

BrainwashState.prototype.update = function() {
    this.spiral.skin.rotation += 3;
    //console.log("Brainwash: update");
}

BrainwashState.prototype.destroy = function() {
    this.back.destroy();
    this.nextButton.destroy();
    this.title1.destroy();
    this.title2.destroy();
    this.spiral.destroy();
}