/**
 * Created by postepenno on 31.01.14.
 */

var LevelSelectView = ComponentBox.extend({

    init: function(game) {

        this.game = game;

        this._super();

        //this.addComponent( new Background() );

        this.itemsContainer = new createjs.Container();
        Main.viewContainer.addChild(this.itemsContainer);

        this.groups = [];
        for (var i = 0; i < 3; i++)
        {
            var group = new LevelsGroup(i, this.game, this.itemsContainer);
            this.addComponent(group);
            this.groups.push(group);
        }


        this.addComponent( new Picture(Main.viewContainer, "levelSelectTitle", {x:0, y:10}) );

        var homeButton = new Button(Main.viewContainer, "homeButton", this.homeClick, this, {x:70, y:650, center:true});
        this.addComponent(homeButton);

        this.scrollUp = new Button(Main.viewContainer, "upButton", this.scrollUpClick, this, {x:570, y:650, center:true});
        this.addComponent(this.scrollUp);

        this.scrollDown = new Button(Main.viewContainer, "downButton", this.scrollDownClick, this, {x:450, y:650, center:true});
        this.addComponent(this.scrollDown);

        this.itemsContainer.y = -Config.HEIGHT * LevelSelectView.CURRENT_GROUP_ID;
        if (LevelSelectView.CURRENT_GROUP_ID == 0) this.scrollUp.hide();
        else if (LevelSelectView.CURRENT_GROUP_ID == 2) this.scrollDown.hide();
    },

    scrollUpClick: function(bt)
    {
        if (LevelSelectView.CURRENT_GROUP_ID == 1) this.scrollUp.scaleHide();
        else if (LevelSelectView.CURRENT_GROUP_ID == 2) this.scrollDown.scaleShow();

        LevelSelectView.CURRENT_GROUP_ID--;

        this.scrollUp.disableClick();
        this.scrollDown.disableClick();

        createjs.Tween.get(this.itemsContainer)
            .to({y:-Config.HEIGHT * LevelSelectView.CURRENT_GROUP_ID}, 500, createjs.Ease.quadInOut)
            .call(this.scrollComplete, [], this)
    },

    scrollDownClick: function(bt)
    {
        if (LevelSelectView.CURRENT_GROUP_ID == 0) this.scrollUp.scaleShow();
        else if (LevelSelectView.CURRENT_GROUP_ID == 1) this.scrollDown.scaleHide();

        LevelSelectView.CURRENT_GROUP_ID++;

        this.scrollUp.disableClick();
        this.scrollDown.disableClick();


        createjs.Tween.get(this.itemsContainer)
            .to({y:-Config.HEIGHT * LevelSelectView.CURRENT_GROUP_ID}, 500, createjs.Ease.quadInOut)
            .call(this.scrollComplete, [], this)
    },

    scrollComplete: function()
    {
        this.scrollUp.enableClick();
        this.scrollDown.enableClick();
    },

    homeClick: function(bt)
    {
        Fader.fade(this.goHome, this);
    },

    goHome:function()
    {
        Main.removeViewByClass(LevelSelectView);
        Main.addView( new MainMenuView(this.game) );
    },

    gameStart: function()
    {
        Main.removeViewByClass(MainMenuView);
        this.game.levelStartByID(0);
    },

    destroy: function()
    {
        this._super();

        Main.viewContainer.removeChild(this.itemsContainer);
    }


});

LevelSelectView.CURRENT_GROUP_ID = 0;