/**
 * Created by postepenno on 31.03.14.
 */

App.Cookies = Class.extend({

    init: function()
    {
        this.gameStorageKey = "iknowart2";

        this.initSound();

        this.isNewGame = true;
        this.initLevels();
        //this.traceLevels();
    },

    // use game.device.localStorage instead
    isSupported: function()
    {
        var testKey = 'test', storage = window.sessionStorage;
        try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    },

    getStorage: function(key)
    {
        return localStorage[this.gameStorageKey+ "." + key];
    },

    setStorage: function(key, value)
    {
        if (this.isSupported()) localStorage[this.gameStorageKey + "." + key] = value;
        //if (game.device.localStorage)
    },

    initSound: function()
    {
        if (this.getStorage("soundEnabled") == "false") Config.SOUNDS_ENABLED = false;
        else Config.SOUNDS_ENABLED = true;
    },

    saveSound: function()
    {
        this.setStorage("soundEnabled", Config.SOUNDS_ENABLED);
    },

    initLevels: function()
    {
        if (this.getStorage("levels") != undefined)
        {
            for (var i = 0; i < data.levels.length; i++)
            {
                var level = data.levels[i];
                if (this.getStorage("levels." + i + ".isCompleted") == "true")
                {
                    level.isOpen = true;
                    level.isCompleted = true;
                    var bestMoves = this.getStorage("levels." + i + ".bestMoves");
                    //console.log(i, bestMoves);
                    if (bestMoves != undefined)
                    {
                        level.bestMoves = parseInt(bestMoves);
                    }
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
            for (i = 0; i < data.levels.length; i++)
            {
                level = data.levels[i];
                level.isOpen = true;
            }
        }
        else
        {
            for (i = 0; i < data.levels.length; i++)
            {
                level = data.levels[i];
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
        this.setStorage("levels", "true");
        var id = data.curLevel.id;
        this.setStorage("levels." + id + ".isCompleted", "true");
        this.setStorage("levels." + id + ".bestMoves", data.curLevel.bestMoves);

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
        localStorage.clear();
        this.isNewGame = true;
        this.uncompleteLevels();
        this.updateOpenLevels();

    },

    uncompleteLevels: function()
    {
        for (var i = 0; i < data.levels.length; i++)
        {
            var level = data.levels[i];
            level.reset();
        }
    }


});