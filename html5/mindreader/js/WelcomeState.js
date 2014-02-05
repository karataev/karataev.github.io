/**
 * Created by postepenno on 17.01.14.
 */

function WelcomeState() {
    this.back;
    this.playButton;
    this.creditsButton;
    this.moreGamesButton;
    this.title;
    this.titlePos;
    this.zz = 10;

    this.brandContainer;
    this.brandImage;


    this.init();
}

WelcomeState.prototype.init = function() {
    this.back = new Background();
    this.playButton = new Button(77, 277, "playButton", this.playClick, this);
    this.moreGamesButton = new Button(77, 341, "moreGamesButton", this.moreGamesClick, this);
    this.creditsButton = new Button(77, 407, "creditsButton", this.creditsClick, this);
    this.title = new Sprite(61, 20, "welcomeTitle");
    this.titlePos = this.title.y;

    if (!fgl.crossPromotionEnabled) {
        this.moreGamesButton.hide();
    }

    startRound();

    //console.log("show branding?", fgl.brandingEnabled);
    if (fgl.brandingEnabled) {
        brandContainer.visible = true;
        this.playButton.skin.y = 218;
        this.moreGamesButton.skin.y = 268;
        this.creditsButton.skin.y = 318;
        this.title.skin.y = 11;
    }
    else {
        brandContainer.visible = false;
    }


    //this.title.skin.addEventListener("click", this.titleClick);

    if (welcomeCount > 0) {
        fgl.showAd();
    }
    welcomeCount++;
}

WelcomeState.prototype.titleClick = function(event) {
    console.log("title!");
}

WelcomeState.prototype.playClick = function(event) {
    //console.log("play", this.zz);
    this.destroy();
    currentState = new RememberState();
}

WelcomeState.prototype.creditsClick = function(event) {
    this.destroy();
    currentState = new CreditsState();
}

WelcomeState.prototype.moreGamesClick = function(event) {
    fgl.showMoreGames();
}

WelcomeState.prototype.update = function() {
    if (!fgl.brandingEnabled) {
        var time = createjs.Ticker.getTime();
        var dy = 15 * Math.sin(time / (500));
        this.title.skin.y = this.titlePos + dy;
    }
}


WelcomeState.prototype.destroy = function() {
    brandContainer.visible = false;

    this.back.destroy();
    this.playButton.destroy();
    this.creditsButton.destroy();
    this.moreGamesButton.destroy();
    this.title.destroy();
}