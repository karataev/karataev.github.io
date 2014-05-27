/**
 * Created by postepenno on 30.01.14.
 */

var Assets = Class.extend({

    queue: undefined,
    callback: undefined,
    scope: undefined,
    loaderBar: undefined,
    percentTf: undefined,

    init: function(callback, scope) {

        this.callback = callback;
        this.scope = scope;

        this.preloader = new Preloader();

        this.queue = new createjs.LoadQueue(false);
        createjs.Sound.alternateExtensions = ["mp3"];
        this.queue.installPlugin(createjs.Sound);

        var art = [
            "background",
            "fader",
            "dialogSmall",
            "dialogMedium",
            "dialogBig",
            "blackBack",

            "dragItem",
            "dragItem2",
            "dragItem3",
            "dragItem4",
            "dragItemFixed",
            "dragItemSelection",

            // main menu
            "playButton",
            "playButton2",
            "soundIconOn",
            "soundIconOff",
            "gameTitle",
            "editorButton",
            "creditsButton",

            // level select
            "levelSelectTitle",
            "homeButton",
            "upButton",
            "downButton",
            "levelItemBack",
            "levelItemCompleteBack",
            "levelItemLockedBack",

            // level view
            "restartButton",
            "pauseButton",
            "levelUIBack",
            "newRecord",
            "timerIcon",

            // editor
            "shuffleButton",
            "saveButton",

            // level complete
            "levelCompleteTitle",
            "levelCompleteBack",
            "nextButton",

            // pause
            "levelsButton",
            "pauseTitle",
            "pauseBox",

            // delete progress
            "deleteProgressTitle",
            "clearProgressBox",
            "yesButton",
            "noButton",

            // game complete
            "gameCompleteBox",

            // credits
            "creditsTitle",
            "creditsBox",
            "closeButton",
            "postepennoLogo"
        ];

        var sounds = [
            "sndClick",
            "sndLevelComplete"
            //"sndLevelFail",
            //"sndPop",
            //"sndWobble",
            //"music"
        ];

        var manifest = [];

        var i;
        for (i = 0; i < art.length; i++)
        {
            var fileName = art[i].indexOf(".jpg") == -1 ? art[i] + ".png" : art[i];
            manifest.push({id: art[i], src:"assets/images/" + fileName});
        }

        for (i = 0; i < sounds.length; i++)
        {
            manifest.push( {id: sounds[i], src:"assets/sounds/" + sounds[i] + ".ogg"} );
        }

        this.queue.on("fileload", this.onFileLoad, this);
        this.queue.on("complete", this.onComplete, this);
        this.queue.loadManifest(manifest);

    },

    get: function(assetName)
    {
        return this.queue.getResult(assetName);
    },

    onComplete: function(event)
    {
        createjs.Tween.get(this.preloader.container)
            .to({y:this.preloader.container.y + 50, alpha:0}, 500, createjs.Ease.linear)
            .call(this.preloaderHideComplete, [], this)
    },

    preloaderHideComplete: function()
    {
        this.preloader.destroy();
        this.callback.call(this.scope);
    },

    onFileLoad: function(event) {
        this.preloader.update(this.queue.progress);
    }

});