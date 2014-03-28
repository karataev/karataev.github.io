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

            // level select
            {id:"levelSelectTitle", src:"assets/images/levelSelectTitle.png"},
            {id:"homeButton", src:"assets/images/homeButton.png"},
            {id:"levelItemBack", src:"assets/images/levelItemBack.png"},

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
            {id:"pauseBack", src:"assets/images/pauseBack.png"},
            {id:"pauseInner", src:"assets/images/pauseInner.png"},
            {id:"exit2Button", src:"assets/images/exit2Button.png"},
            {id:"resumeButton", src:"assets/images/resumeButton.png"},


            // sounds
            {id:"sndClick", src:"assets/sounds/click.ogg"}

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