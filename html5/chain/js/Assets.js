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

        var manifest = [

            // images
            {id:"background", src:"assets/images/background.png"},
            {id:"fader", src:"assets/images/fader.png"},
            {id:"circle", src:"assets/images/circle.png"},
            {id:"circle2", src:"assets/images/circle2.png"},
            {id:"circle3", src:"assets/images/circle3.png"},
            {id:"circle4", src:"assets/images/circle4.png"},
            {id:"bullet", src:"assets/images/bullet.png"},

            // main menu
            {id:"playButton", src:"assets/images/playButton.png"},
            {id:"soundIconOn", src:"assets/images/soundIconOn.png"},
            {id:"soundIconOff", src:"assets/images/soundIconOff.png"},
            {id:"cloud1", src:"assets/images/cloud1.png"},
            {id:"cloud2", src:"assets/images/cloud2.png"},
            {id:"cloud3", src:"assets/images/cloud3.png"},
            {id:"cloud4", src:"assets/images/cloud4.png"},
            {id:"eyesAnim", src:"assets/images/eyesAnim.png"},
            {id:"eyesStatic", src:"assets/images/eyesStatic.png"},
            {id:"gameTitle", src:"assets/images/gameTitle.png"},

            // level select
            {id:"levelSelectTitle", src:"assets/images/levelSelectTitle.png"},
            {id:"homeButton", src:"assets/images/homeButton.png"},
            {id:"upButton", src:"assets/images/upButton.png"},
            {id:"downButton", src:"assets/images/downButton.png"},
            {id:"levelItemBack", src:"assets/images/levelItemBack.png"},
            {id:"levelItemCompleteBack", src:"assets/images/levelItemCompleteBack.png"},
            {id:"levelItemLockedBack", src:"assets/images/levelItemLockedBack.png"},

            // level view
            {id:"restartButton", src:"assets/images/restartButton.png"},
            {id:"menuButton", src:"assets/images/menuButton.png"},
            {id:"pauseButton", src:"assets/images/pauseButton.png"},
            {id:"levelUIBack", src:"assets/images/levelUIBack.png"},

            // level complete
            {id:"levelCompleteInner", src:"assets/images/levelCompleteInner.png"},
            {id:"nextButton", src:"assets/images/nextButton.png"},

            // level fail
            {id:"levelFailInner", src:"assets/images/levelFailInner.png"},

            // pause
            {id:"blackBack", src:"assets/images/blackBack.png"},
            {id:"pauseInner", src:"assets/images/pauseInner.png"},
            {id:"exit2Button", src:"assets/images/exit2Button.png"},
            {id:"resumeButton", src:"assets/images/resumeButton.png"},

            // delete progress
            {id:"deleteProgressInner", src:"assets/images/deleteProgressInner.png"},
            {id:"yesButton", src:"assets/images/yesButton.png"},
            {id:"noButton", src:"assets/images/noButton.png"},

            // game complete
            {id:"gameCompleteInner", src:"assets/images/gameCompleteInner.png"},

            // credits
            {id:"creditsInner", src:"assets/images/creditsInner.png"},
            {id:"creditsButton", src:"assets/images/creditsButton.png"},
            {id:"closeButton", src:"assets/images/closeButton.png"},
            {id:"postepennoLogo", src:"assets/images/postepennoLogo.png"},
            {id:"karataev", src:"assets/images/karataev.png"},

            // sounds
            {id:"sndClick", src:"assets/sounds/click.ogg"},
            {id:"sndLevelComplete", src:"assets/sounds/levelComplete.ogg"},
            {id:"sndLevelFail", src:"assets/sounds/levelFail.ogg"},
            {id:"sndPop", src:"assets/sounds/pop.ogg"},
            {id:"sndWobble", src:"assets/sounds/wobble.ogg"}

        ];

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
        this.preloader.destroy();
        this.callback(this.scope);
    },

    onFileLoad: function(event) {
        this.preloader.update(this.queue.progress);
    }

});