/**
 * Created by postepenno on 17.01.14.
 */

function SurpriseState() {
    this.back;
    this.nextButton;
    this.title;

    this.cards;

    this.init();
}

SurpriseState.prototype.init = function() {
    this.back = new Background();
    this.nextButton = new Button(77, 411, "againButton", this.nextClick, this);
    this.title = new Sprite(0, 308, "surpriseTitle");

    this.createCards();
    this.tweenCards();

    this.nextButton.skin.alpha = 0;
    this.title.skin.alpha = 0;

    createjs.Tween.get(this.title.skin)
        .wait(2000)
        .to({alpha:1}, 1000, createjs.Ease.linear);

    createjs.Tween.get(this.nextButton.skin)
        .wait(4000)
        .to({alpha:1}, 1000, createjs.Ease.linear);

}

SurpriseState.prototype.createCards = function() {
    this.cards = [];

    var x = [19, 67, 116, 164, 213];
    var y = [16, 51, 83, 123, 159];

    for (var i = 0; i < 5; i++) {
        var index = Math.floor(Math.random() * finalFrames.length);
        var frame = finalFrames[index];
        var cardAsset = cardImages[frame - 1];
        var card = new Card(x[i], y[i], cardAsset);
        finalFrames.splice(index, 1);
        //console.log(index, frame, cardAsset);
        this.cards.push(card);
    }
}

SurpriseState.prototype.tweenCards = function() {
    for (var i = 0; i < this.cards.length; i++) {
        var card = this.cards[i];
        var target = card.skin;
        target.alpha = 0;
        var targetY = target.y;
        target.y+= 30;
        createjs.Tween.get(target)
            .wait(i * 300)
            .to({alpha:1, y:targetY}, 500, createjs.Ease.backOut)
    }
}

SurpriseState.prototype.nextClick = function() {
    this.destroy();
    currentState = new WelcomeState();
}

SurpriseState.prototype.update = function() {
    //console.log("Surprise: update");
}

SurpriseState.prototype.destroy = function() {
    this.back.destroy();
    this.nextButton.destroy();
    this.title.destroy();

    for (var i = 0; i < this.cards.length; i++) {
        var card = this.cards[i];
        card.destroy();
    }
}