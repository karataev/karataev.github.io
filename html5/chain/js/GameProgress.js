/**
 * Created by postepenno on 31.03.14.
 */

var GameProgress = Class.extend({

    init: function(game)
    {
        this.game = game;

        this.initSound();
        this.initLevels();

        //this.traceLevels();
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

        this.updateOpenLevels();
    },

    traceLevels: function()
    {
        for (var i = 0; i < this.game.levels.length; i++)
        {
            var level = this.game.levels[i];
            console.log(level.id + " " + level.isCompleted);
        }
    },

    clear: function()
    {
        //console.log("CLEAR PROGRESS!");
        localStorage.clear();
        this.uncompleteLevels();
        this.updateOpenLevels();
    },

    uncompleteLevels: function()
    {
        for (var i = 0; i < this.game.levels.length; i++)
        {
            var level = this.game.levels[i];
            level.isCompleted = false;
            level.isOpen = false;
        }
    }


});