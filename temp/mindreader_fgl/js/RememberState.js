/**
 * Created by postepenno on 17.01.14.
 */

function RememberState() {
    this.back;
    this.nextButton;
    this.title;
    this.z = 10;

    this.cards;

    this.init();
}

RememberState.prototype.init = function() {
    this.back = new Background();
    this.nextButton = new Button(77, 418, "rememberButton", this.nextClick, this);
    this.title = new Sprite(18, 322, "rememberTitle");

    this.createCards();
    this.tweenCards();

    this.title.skin.alpha = 0;
    createjs.Tween.get(this.title.skin)
        .wait(2000)
        .to({alpha:1}, 1000, createjs.Ease.linear);

    this.nextButton.skin.alpha = 0;
    createjs.Tween.get(this.nextButton.skin)
        .wait(4000)
        .to({alpha:1}, 1000, createjs.Ease.linear);
}

RememberState.prototype.createCards = function() {
    var x = [15, 116, 218, 15, 116, 218];
    var y = [23, 23, 23, 173, 173, 173];

    this.cards = [];
    for (var i = 0; i < 6; i++) {
        var index = Math.floor(Math.random() * startFrames.length);
        var frame = startFrames[index];
        var cardAsset = cardImages[frame - 1];
        var card = new Card(x[i], y[i], cardAsset);
        startFrames.splice(index, 1);
        //console.log(index, frame, cardAsset);
        this.cards.push(card);
    }
}

RememberState.prototype.tweenCards = function() {
    for (var i = 0; i < this.cards.length; i++) {
        var card = this.cards[i];
        var target = card.skin;
        target.alpha = 0;
        var targetY = target.y;
        target.y+= 30;
        createjs.Tween.get(target)
            .wait(i * 300)
            .to({alpha:1, y:targetY}, 500, createjs.Ease.backOut)
            .call(this.cardComplete);
    }
}

RememberState.prototype.cardComplete = function() {
    //console.log("card complete " + this.z);
}

RememberState.prototype.nextClick = function(event) {
    //console.log("NEXT");
    createjs.Tween.removeAllTweens();
    this.destroy();
    currentState = new BrainwashState();
}

RememberState.prototype.update = function() {
    //console.log("Remember: update");
}


RememberState.prototype.destroy = function() {
    this.back.destroy();
    this.nextButton.destroy();
    this.title.destroy();

    for (var i = 0; i < this.cards.length; i++) {
        var card = this.cards[i];
        card.destroy();
    }
}