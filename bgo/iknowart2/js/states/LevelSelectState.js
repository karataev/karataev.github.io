/**
 * Created by postepenno on 18.06.2014.
 */

App.LevelSelectState = function(game) {};

App.LevelSelectState.prototype = {

    create: function()
    {
        this.add.sprite(0, 0, 'cuteBack2.jpg');

        data.addAtlasSprite("itemsBack", {x:70, y:80});

        this.home = new App.MyButton("homeButton", this.homeClick, this, {x:320, y:760, center:true, wobble:true});

        this.itemsHolder = new Phaser.Group(this.game, this.game.world);
        this.groupsNum = 1;
        for (var i = 0; i < this.groupsNum; i++)
        {
            var g = new App.LevelsGroup(this.game, i, this.itemsHolder);
        }

        //this.scrollUp = new App.MyButton(this.game, "upButton", this.scrollUpClick, this, {x:555, y:650, center:true});
        //this.scrollDown = new App.MyButton(this.game, "downButton", this.scrollDownClick, this, {x:445, y:650, center:true});

        //this.itemsHolder.y = -Config.HEIGHT * App.LevelSelectState.CURRENT_GROUP_ID;
        //if (App.LevelSelectState.CURRENT_GROUP_ID == 0) this.scrollUp.hide();
        //else if (App.LevelSelectState.CURRENT_GROUP_ID == this.groupsNum - 1) this.scrollDown.hide();

        var totalMoves = data.getTotalMoves();
        this.movesTf = game.add.text(Config.WIDTH / 2, 590, data.text("totalMoves") + totalMoves, {font: "50px Arial", fill: "#000000"}, this.uiGroup);
        this.movesTf.anchor.set(0.5, 0.5);

        if (App.Fader.SHOULD_FADE_OUT) fader.fadeOut();
    },

    scrollUpClick: function(bt)
    {
        if (App.LevelSelectState.CURRENT_GROUP_ID == 1) this.scrollUp.scaleHide();
        if (App.LevelSelectState.CURRENT_GROUP_ID == this.groupsNum - 1) this.scrollDown.scaleShow();

        App.LevelSelectState.CURRENT_GROUP_ID--;

        this.scrollUp.disableClick();
        this.scrollDown.disableClick();

        var tween = this.game.add.tween(this.itemsHolder);
        tween.to({y:-Config.HEIGHT * App.LevelSelectState.CURRENT_GROUP_ID}, 500, Phaser.Easing.Quadratic.InOut, true);
        tween.onComplete.addOnce(this.scrollComplete, this);
    },

    scrollDownClick: function(bt)
    {
        if (App.LevelSelectState.CURRENT_GROUP_ID == 0) this.scrollUp.scaleShow();
        if (App.LevelSelectState.CURRENT_GROUP_ID == this.groupsNum - 2) this.scrollDown.scaleHide();

        App.LevelSelectState.CURRENT_GROUP_ID++;

        this.scrollUp.disableClick();
        this.scrollDown.disableClick();

        var tween = this.game.add.tween(this.itemsHolder);
        tween.to({y:-Config.HEIGHT * App.LevelSelectState.CURRENT_GROUP_ID}, 500, Phaser.Easing.Quadratic.InOut, true);
        tween.onComplete.addOnce(this.scrollComplete, this);
    },

    scrollComplete: function()
    {
        this.scrollUp.enableClick();
        this.scrollDown.enableClick();
    },

    homeClick: function()
    {
        fader.fade(this.gotoMainMenu, this)
    },

    gotoMainMenu: function()
    {
        this.game.state.start("MainMenu");
    }
};

App.LevelSelectState.CURRENT_GROUP_ID = 0;
