/**
 * Created by postepenno on 31.01.14.
 */

var MainMenuView = ComponentBox.extend({

    init: function(game) {

        this.game = game;

        this._super();

        //this.addComponent( new Background() );

        this.title = new Picture(Main.viewContainer, "gameTitle", {x:90, y:0});
        this.addComponent(this.title);

        this.playButton = new Button(Main.viewContainer, "playButton2", this.playClick, this, {x:320, y:510, center:true});
        createjs.Tween.get(this.playButton.bmp, {loop:true})
            .to({scaleX:1.2, scaleY:1.2}, 1000, createjs.Ease.sineInOut)
            .to({scaleX:1, scaleY:1}, 1000, createjs.Ease.sineInOut);

        this.addComponent(this.playButton);

        this.soundIcon = new SoundIcon(Main.viewContainer, 80, 650);
        this.addComponent(this.soundIcon);
        //this.addComponent( new Button(Main.viewContainer, "editorButton", this.editorClick, this, {x:40, y:360, center:true}) );

        this.deleteProgress = new Button(Main.viewContainer, "restartButton", this.clearProgressClick, this, {x:550, y:650, center:true});
        this.addComponent(this.deleteProgress);

        this.credits = new Button(Main.viewContainer, "creditsButton", this.creditsClick, this, {x:320, y:650, center:true});
        this.addComponent(this.credits);

        // null text font!
        var verTxt = "v " + Config.VERSION;
        this.addComponent( new TextField(Main.viewContainer, verTxt, {x:2, y:0, color:"#000000", font:"10px Arial"}) );

        this.showWithTweens();
    },

    showWithTweens: function()
    {
        this.title.bitmap.alpha = 0;

        createjs.Tween.get(this.title.bitmap)
            .to({alpha:1}, 800, createjs.Ease.linear);

        this.tweenScaleButton(this.soundIcon.holder, 800);
        this.tweenScaleButton(this.credits.bmp, 1000);
        this.tweenScaleButton(this.deleteProgress.bmp, 1200);
        this.tweenAlphaButton(this.playButton.bmp, 1400);
    },

    tweenScaleButton: function(obj, delay)
    {
        obj.scaleX = obj.scaleY = 0;
        createjs.Tween.get(obj)
            .wait(delay)
            .to({scaleX:1, scaleY:1}, 500, createjs.Ease.backOut)
    },

    tweenAlphaButton: function(obj, delay)
    {
        obj.alpha = 0;
        createjs.Tween.get(obj)
            .wait(delay)
            .to({alpha:1}, 500, createjs.Ease.linear)
    },

    editorClick: function()
    {
        Main.removeViewByClass(MainMenuView);

        var editor = new Editor();
        editor.levelStart();
    },

    creditsClick: function(bt)
    {
        Main.addView( new CreditsView(this.game) );
    },

    clearProgressClick: function(bt)
    {
        Main.addView( new DeleteProgressView(this.game) );
    },

    playClick: function(bt)
    {
        Fader.fade(this.gameStart, this);
    },

    gameStart: function()
    {
        Main.removeViewByClass(MainMenuView);

        if (Config.TEST_GAME_COMPLETE)
        {
            this.game.gameComplete();
        }
        else
        {
            if (cookies.isNewGame) this.game.levelStartByID(0);
            else Main.addView( new LevelSelectView(this.game) );
        }
    }


});