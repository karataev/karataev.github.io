/**
 * Created by postepenno on 17.01.14.
 */

function CreditsState() {
    this.back;
    this.creditsButton;
    this.backButton;

    this.init();
}

CreditsState.prototype.init = function() {
    this.back = new Background();
    this.creditsButton = new Button(0, 104, "creditsTitle", this.titleClick, this);

    // touch all area
    var skin = this.creditsButton.skin;
    var hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRect(0,0,skin.image.width, skin.image.height);
    skin.hitArea = hit;

    this.backButton = new Button(76, 370, "backButton", this.backClick, this);
}

CreditsState.prototype.titleClick = function() {
    window.location.href = "mailto:eugene.karataev@gmail.com";
}

CreditsState.prototype.backClick = function() {
    this.destroy();
    currentState = new WelcomeState();
}

CreditsState.prototype.update = function() {
    //console.log("Credits: update");
}

CreditsState.prototype.destroy = function() {
    this.back.destroy();
    this.creditsButton.destroy();
    this.backButton.destroy();
}