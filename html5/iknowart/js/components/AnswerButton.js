/**
 * Created by postepenno on 09.02.14.
 */

var AnswerButton = ComponentBox.extend({

    init: function(parent, text, x, y, game)
    {
        this._super();

        this.parent = parent;
        this.text = text;
        this.game = game;

        this.container = new createjs.Container();
        this.parent.addChild(this.container);

        this.container.x = x;
        this.container.y = y;

        this.back = new Picture(this.container, "answerButton");
        this.addComponent(this.back);
        this.tf = new TextField(this.container, this.text, {x:150, y:10, align:"center", font:"bold 25px Arial", color:"#FFFFFF"});
        this.addComponent(this.tf);

        this.container.addEventListener("click", this);

        //console.log("ZZ", this.container.cursor);
        this.container.cursor = "pointer";
    },

    hide: function() {
        this.container.visible = false;
    },

    tweenShow: function(delay, time) {
        this.container.alpha = 0;
        var posY = this.container.y;
        this.container.y += 40;
        createjs.Tween.get(this.container)
            .wait(delay)
            .to({alpha:1, y:posY}, time, createjs.Ease.backOut);
    },

    tweenHide: function(delay, time) {
        var posY = this.container.y + 40;
        createjs.Tween.get(this.container)
            .wait(delay)
            .to({alpha:0, y:posY}, time, createjs.Ease.backIn);
    },

    handleEvent: function(event) {
        switch (event.type) {
            case "click":
                Sounds.play("sndClick");
                this.doSelect();
                this.game.playerAnswered(this.text);
                break;
        }
    },

    disable: function() {
        this.container.cursor = null;
        this.container.removeEventListener("click", this);
    },

    doSelect: function() {
        this.removeComponent(this.back);
        this.back = new Picture(this.container, "selectedButton", {childIndex:0});
        this.addComponent(this.back);
    },

    doCorrect: function() {
        this.removeComponent(this.back);
        this.back = new Picture(this.container, "correctButton", {childIndex:0});
        this.addComponent(this.back);
    },

    destroy: function() {

        this._super();

        this.container.removeEventListener("click", this);
        this.parent.removeChild(this.container);
    }

});