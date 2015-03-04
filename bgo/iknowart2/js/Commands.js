/**
 * Created by postepenno on 23.06.2014.
 */

App.Commands = Class.extend({

    init: function()
    {
    },

    gameStart: function()
    {
        if (Config.TEST_GAME_COMPLETE)
        {
            cmd.gameComplete();
        }
        else
        {
            //cmd.levelStart(Config.START_LEVEL);
            game.state.start("LevelSelect");
        }
    },

    levelStart: function(id)
    {
        data.curLevel = data.levels[id];
        data.levelStartTime = game.time.now;
        data.pauseTime = 0;
        data.curLevel.moves = 0;

        game.state.start("Gameplay");
    },

    playerMadeMove: function()
    {
        data.curLevel.moves++;
        game.state.getCurrentState().updateMoves();
    },


    levelComplete: function()
    {
        game.state.getCurrentState().levelComplete();
        data.curLevel.complete();
        cookies.levelComplete();
        sounds.play("sndLevelComplete");

        //stateSlider.levelComplete();
    },

    levelNext: function()
    {
        var levelId = data.curLevel.id;
        var nextLevel = data.levels[levelId + 1];

        if (!nextLevel)
        {
            cmd.gameComplete();
        }
        else
        {
            fader.fade(this.gotoNextLevel, this);
        }
    },

    gotoNextLevel: function()
    {
        var levelId = data.curLevel.id;
        cmd.levelStart(levelId + 1);
    },

    gameComplete: function()
    {
        fader.fade(this.doGameComplete, this);
    },

    doGameComplete: function()
    {
        game.state.start("GameComplete");
    }

});
