/**
 * Created by postepenno on 31.03.14.
 */

var Cookies = Class.extend({

    init: function()
    {
        this.initSound();

        //this.traceLevels();
    },

    assignGame: function(game)
    {
        this.game = game;
        this.isNewGame = true;

        this.initLevels();
    },

    initSound: function()
    {
        if (localStorage["game.soundEnabled"] == "false") Sounds.soundEnabled = false;
        else Sounds.soundEnabled = true;
    },

    saveSound: function()
    {
        localStorage["game.soundEnabled"] = Sounds.soundEnabled;
    },

    initLevels: function()
    {
        if (localStorage["game.levels"] != undefined)
        {
            for (var i = 0; i < this.game.levels.length; i++)
            {
                var level = this.game.levels[i];
                if (localStorage["game.levels." + i + ".isCompleted"] == "true")
                {
                    level.isOpen = true;
                    level.isCompleted = true;
                    var time = localStorage["game.levels." + i + ".time"];
                    if (time !== undefined) level.bestTime = time;
                    this.isNewGame = false;
                }
            }
        }

        this.updateOpenLevels();
    },

    updateOpenLevels: function()
    {
        var i, level;

        if (Config.OPEN_ALL_LEVELS)
        {
            for (i = 0; i < this.game.levels.length; i++)
            {
                level = this.game.levels[i];
                level.isOpen = true;
            }
        }
        else
        {
            for (i = 0; i < this.game.levels.length; i++)
            {
                level = this.game.levels[i];
                if (!level.isCompleted)
                {
                    level.isOpen = true;
                    break;
                }
            }
        }
    },

    levelComplete: function()
    {
        localStorage["game.levels"] = "true";
        var id = this.game.curLevel.id;
        localStorage["game.levels." + id + ".isCompleted"] = "true";
        localStorage["game.levels." + id + ".time"] = this.game.curLevel.bestTime;

        this.isNewGame = false;
        this.updateOpenLevels();
    },

    /*traceLevels: function()
    {
        for (var i = 0; i < this.game.levels.length; i++)
        {
            var level = this.game.levels[i];
            console.log(level.id + " " + level.isCompleted);
        }
    },*/

    clear: function()
    {
        //console.log("CLEAR PROGRESS!");
        localStorage.clear();
        this.isNewGame = true;
        this.uncompleteLevels();
        this.updateOpenLevels();

    },

    uncompleteLevels: function()
    {
        for (var i = 0; i < this.game.levels.length; i++)
        {
            var level = this.game.levels[i];
            level.reset();
        }
    }


});