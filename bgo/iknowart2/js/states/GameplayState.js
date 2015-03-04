/**
 * Created by postepenno on 18.06.2014.
 */

App.GameplayState = function(game) {};

App.GameplayState.prototype = {

    create: function()
    {
        this.coreGroup = new Phaser.Group(this.game, this.game.world);

        // UI
        this.uiGroup = new Phaser.Group(this.game, this.game.world);
        this.uiGroup.y = 640;
        this.uiGroup.fixedToCamera = true;
        data.addAtlasSprite("levelUIBack", {parent:this.uiGroup});
        data.addAtlasSprite("levelNumUnderlay", {x:Config.WIDTH / 2, y:42, center:true, parent:this.uiGroup});

        this.home = new App.MyButton("backButton", this.homeClick, this, {x:100, y:125, center:true, parentGroup:this.uiGroup, wobble:true});
        this.restart = new App.MyButton("restartButton", this.restartClick, this, {x:260, y:125, center:true, parentGroup:this.uiGroup, wobble:true});

        if (Config.ENABLE_CHEAT) this.cheatBt = new App.MyButton("cheatButton", this.cheatClick, this, {x:615, y:25, center:true, parentGroup:this.uiGroup});

        this.logic = undefined;
        var logicType = data.curLevel.data.type;
        if (logicType == "swapTiles") this.logic = new App.LogicSwapTiles(this.coreGroup);
        else if (logicType == "rotateTiles") this.logic = new App.LogicRotateTiles(this.coreGroup);
        else if (logicType == "rotateCircle") this.logic = new App.LogicRotateCircle(this.coreGroup);
        else if (logicType == "dragTiles") this.logic = new App.LogicDragTiles(this.coreGroup);

        var levelNum = data.text("level") + (data.curLevel.id + 1);
        this.levelTf = game.add.text(Config.WIDTH / 2, 42, levelNum, {font: "50px Arial", fill: "#000000"}, this.uiGroup);
        this.levelTf.anchor.set(0.5, 0.5);

        this.movesTf = game.add.text(530, 125, data.text("moves") + "0", {font: "30px Arial", fill: "#000000"}, this.uiGroup);
        this.movesTf.anchor.set(0.5, 0.5);

        this.soundIcon = new App.SoundIcon({x:380, y:125, parentGroup:this.uiGroup});

/*
        if (Config.SHOW_FPS) this.fps = new App.FPS(this.game, this.uiGroup);
        this.game.onPause.add(this.globalPauseOn, this);
        this.game.onResume.add(this.globalPauseOff, this);

        this.tutorial = new App.Tutorial(this.game);
*/

        var levelId = data.curLevel.id + 1;
        boomerangoApi.gameStarted({level:levelId});

        if (App.Fader.SHOULD_FADE_OUT) fader.fadeOut();
    },

    updateMoves: function()
    {
        this.movesTf.text = data.text("moves") + data.curLevel.moves;
    },

    update: function()
    {
        this.logic.update();
    },

    restartClick: function()
    {
        fader.fade(this.doRestart, this);
    },

    doRestart: function()
    {
        cmd.levelStart(data.curLevel.id);
    },

    nextClick: function()
    {
        cmd.levelNext();
    },

    homeClick: function()
    {
        fader.fade(this.gotoMainMenu, this);
    },

    gotoMainMenu: function()
    {
        game.state.start("LevelSelect");
    },

    cheatClick: function()
    {
        cmd.levelComplete();
    },

    globalPauseOn: function()
    {
        //console.log("pause on");
        this.globalPauseStart = game.time.now;
    },

    globalPauseOff: function()
    {
        //console.log("pause off");
        if (!data.pausedByUser) data.pauseTime += Math.round(game.time.now - this.globalPauseStart);
    },

    addTimerEvent: function()
    {
        this.timerEvent = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateUI, this);
    },

    removeTimerEvent: function()
    {
        this.game.time.events.remove(this.timerEvent);
    },

    updateUI: function()
    {
        this.timer.setTime(data.getLevelTime());
    },

    levelComplete: function()
    {
        this.movesTf.visible = false;

        this.next = new App.MyButton("nextButton", this.nextClick, this, {x:540, y:125, center:true, parentGroup:this.uiGroup, wobble:true});
        this.tweenAlphaButton(this.next.bt, 0);
        //util.pulse(this.next.bt, 1.1);

        this.levelTf.visible = false;

        this.descTxt = game.add.text(Config.WIDTH / 2, 42, data.getPaintingDesc(), { font: "bold 22px Arial", fill: "#000000", align:"center" }, this.uiGroup);
        this.descTxt.anchor.set(0.5, 0.5);
        this.descTxt.alpha = 0;
        game.add.tween(this.descTxt).to({alpha:1}, 500, Phaser.Easing.Linear.None, true);

        var levelId = data.curLevel.id + 1;
        boomerangoApi.gameEnded({level:levelId, score:0, status:BoomerangoApi.GS_LEVEL_SUCCEEDED});
    },

    tweenAlphaButton: function(target, delay)
    {
        target.alpha = 0;
        this.add.tween(target).to({alpha:1}, 500, Phaser.Easing.Linear.None, true, delay);
    },

    pauseClick: function()
    {
        this.removeTimerEvent();
        this.pauseView = new App.PauseView(this);
    },

    resumeGame: function()
    {
    }

};